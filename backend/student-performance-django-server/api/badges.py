class BadgeCalculator:
    def calculate_badges(self, points):
        badges = []
        if points >= 100:
            badges.append("Gold Badge")
        if points >= 50:
            badges.append("Silver Badge")
        if points >= 10:
            badges.append("Bronze Badge")
        return badges