import { openDB } from 'idb';
import { useEffect } from 'react';

const DB_NAME = 'gamify-offline-db';
const STORE_NAME = 'progress-outbox';
const VERSION = 1;

async function getDb() {
    return openDB(DB_NAME, VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
            }
        },
    });
}

export async function addProgressToOutbox(progressData) {
    const db = await getDb();
    await db.add(STORE_NAME, { ...progressData, timestamp: new Date() });
    console.log('Progress saved to outbox');
}

async function syncOfflineData() {
    const token = localStorage.getItem('glp_auth_token');
    if (!navigator.onLine || !token) {
        console.log('Offline or not logged in, skipping sync.');
        return;
    }

    const db = await getDb();
    const allProgress = await db.getAll(STORE_NAME);

    if (allProgress.length === 0) {
        console.log('Outbox is empty. Nothing to sync.');
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:8000/user/sync-progress', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ progressData: allProgress })
        });

        if (response.ok) {
            console.log('Sync successful! Clearing outbox.');
            const tx = db.transaction(STORE_NAME, 'readwrite');
            await tx.store.clear();
            await tx.done;
            window.dispatchEvent(new CustomEvent('sync-success', { detail: { count: allProgress.length } }));
        } else {
            console.error('Sync failed:', await response.json());
        }
    } catch (error) {
        console.error('Error during sync:', error);
    }
}

export const SyncManager = () => {
    useEffect(() => {
        // Attempt sync on load
        syncOfflineData();

        // Add event listeners to sync when coming online
        window.addEventListener('online', syncOfflineData);

        return () => {
            window.removeEventListener('online', syncOfflineData);
        };
    }, []);

    return null; // This is a non-visual component
};