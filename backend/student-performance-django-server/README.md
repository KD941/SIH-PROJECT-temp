# Student Performance Django Server

This project is a Django-based web server designed to calculate badges, achievements, and performance metrics for students based on points received from a front-end application built with Node.js.

## Project Structure

```
student-performance-django-server
├── manage.py
├── student_performance
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── api
│   ├── __init__.py
│   ├── views.py
│   ├── serializers.py
│   ├── badges.py
│   ├── achievements.py
│   └── performance.py
├── requirements.txt
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd student-performance-django-server
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install the required packages:
   ```
   pip install -r requirements.txt
   ```

## Running the Server

To start the Django development server, run:
```
python manage.py runserver
```

The server will be available at `http://127.0.0.1:8000/`.

## API Endpoints

- **POST /api/calculate/**: This endpoint accepts a JSON payload with points and returns the calculated badges, achievements, and performance metrics.

## Usage

Send a POST request to the `/api/calculate/` endpoint with the following JSON structure:
```json
{
    "points": <integer>
}
```

The server will respond with a JSON object containing the badges, achievements, and performance based on the provided points.

## License

This project is licensed under the MIT License. See the LICENSE file for details.