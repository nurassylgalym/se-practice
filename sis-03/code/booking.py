def can_book(start, end, now, blocked, existing):
    """True only when AC1-AC4 hold. Never mutates `existing`."""
    for v in (start, end):
        if isinstance(v, bool) or not isinstance(v, int):
            return False                                  # AC1: integer minutes
    if not (0 <= start < end <= 1440) or start <= now:
        return False                                      # AC1: day bounds, order, after now
    if end - start > 120:
        return False                                      # AC2: max 120, 120 allowed
    if blocked:
        return False                                      # AC3
    return all(end <= s or start >= e for s, e in existing)  # AC4: touching is OK