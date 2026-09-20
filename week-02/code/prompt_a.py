def analyze_marks(marks, pass_mark=50):
    """Analyzes a list of student marks and returns average, highest, lowest, and pass_rate.

    Raises ValueError for invalid inputs (empty list, non-numeric values, or values outside 0-100).
    """
    # Validate input type and non-emptiness
    if not isinstance(marks, list) or len(marks) == 0:
        raise ValueError("Input must be a non-empty list of marks.")

    # Validate pass_mark
    if not isinstance(pass_mark, (int, float)) or isinstance(pass_mark, bool):
        raise ValueError("pass_mark must be a numeric value.")

    # Validate elements in marks
    for mark in marks:
        if isinstance(mark, bool) or not isinstance(mark, (int, float)):
            raise ValueError(
                f"Invalid mark '{mark}': all marks must be numbers."
            )
        if mark < 0 or mark > 100:
            raise ValueError(
                f"Invalid mark '{mark}': marks must be between 0 and 100."
            )

    # Perform analysis
    total_marks = len(marks)
    average_mark = sum(marks) / total_marks
    highest_mark = max(marks)
    lowest_mark = min(marks)

    passed_count = sum(1 for mark in marks if mark >= pass_mark)
    pass_rate = (passed_count / total_marks) * 100

    return {
        "average": average_mark,
        "highest": highest_mark,
        "lowest": lowest_mark,
        "pass_rate": pass_rate,
    }