def analyze_marks(marks, pass_mark=50):
    """Analyzes student marks and returns average, highest, lowest, and pass_rate.

    Raises ValueError for non-empty lists, non-numeric values, or values outside 0-100.
    """
    # Validate that marks is a non-empty list
    if not isinstance(marks, list) or len(marks) == 0:
        raise ValueError("Input 'marks' must be a non-empty list.")

    # Validate that pass_mark is numeric (excluding bool)
    if not isinstance(pass_mark, (int, float)) or isinstance(pass_mark, bool):
        raise ValueError("Parameter 'pass_mark' must be a numeric value.")

    # Validate every element in marks
    for mark in marks:
        if isinstance(mark, bool) or not isinstance(mark, (int, float)):
            raise ValueError(f"Invalid mark '{mark}': marks must be numbers.")
        if mark < 0 or mark > 100:
            raise ValueError(
                f"Invalid mark '{mark}': marks must be between 0 and 100."
            )

    # Calculate metrics
    total_count = len(marks)
    average_mark = sum(marks) / total_count
    highest_mark = max(marks)
    lowest_mark = min(marks)

    passed_count = sum(1 for mark in marks if mark >= pass_mark)
    pass_rate = (passed_count / total_count) * 100

    return {
        "average": average_mark,
        "highest": highest_mark,
        "lowest": lowest_mark,
        "pass_rate": pass_rate,
    }