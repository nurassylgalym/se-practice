def can_book(start: int, end: int, now: int, blocked: bool, existing: list) -> bool:
    """
    Determines if a study room can be booked given the request parameters and constraints.
    
    Parameters:
        start (int): Start time in minutes after midnight (0-1440).
        end (int): End time in minutes after midnight (0-1440).
        now (int): Current time in minutes after midnight (0-1439).
        blocked (bool): True if the room is blocked by an administrator.
        existing (list): List of (start, end) tuples for active bookings on this room.
        
    Returns:
        bool: True if all acceptance criteria AC1-AC4 hold, False otherwise.
    """
    # AC1: Check time bounds, interval ordering, and chronology
    if not (0 <= start < end <= 1440 and start >= now):
        return False

    # AC2: Check maximum booking duration limit (120 minutes)
    if (end - start) > 120:
        return False

    # AC3: Check if room is blocked
    if blocked:
        return False

    # AC4: Check for interval overlaps with existing active bookings
    # Interval overlap condition for half-open intervals [start, end) and [b_start, b_end):
    # Two intervals overlap if and only if start < b_end and end > b_start.
    for b_start, b_end in existing:
        if start < b_end and end > b_start:
            return False

    # AC5: Return True only when all AC1-AC4 conditions pass
    return True