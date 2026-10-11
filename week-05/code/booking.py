def can_book(start: int, end: int, now: int, blocked: bool, existing: list) -> bool:
    """Study-room booking decision. Times are minutes after midnight."""
    # AC1: 0 <= start < end <= 1440, and the start is strictly in the future
    if not (0 <= start < end <= 1440 and start > now):
        return False

    # AC2: at most 120 minutes
    if end - start > 120:
        return False

    # AC3: blocked room accepts nothing
    if blocked:
        return False

    # AC4: half-open intervals overlap iff start < b_end and end > b_start
    for b_start, b_end in existing:
        if start < b_end and end > b_start:
            return False

    # AC5: all checks passed
    return True