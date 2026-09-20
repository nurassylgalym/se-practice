def analyze_marks(marks, pass_mark=50):
    """Analyzes a list of student marks and returns summary metrics in a dictionary.

    Validates inputs and raises ValueError for empty lists, non-numeric values, or
    marks outside the range of 0 to 100.
    """
    # 1. Validate that 'marks' is a non-empty list
    if not isinstance(marks, list) or len(marks) == 0:
        raise ValueError("Input 'marks' must be a non-empty list.")

    # 2. Validate that 'pass_mark' is a valid number (and not a boolean)
    if not isinstance(pass_mark, (int, float)) or isinstance(pass_mark, bool):
        raise ValueError("Parameter 'pass_mark' must be a numeric value.")

    # 3. Validate elements in 'marks'
    for mark in marks:
        if isinstance(mark, bool) or not isinstance(mark, (int, float)):
            raise ValueError(f"Invalid mark '{mark}': all marks must be numeric.")
        if mark < 0 or mark > 100:
            raise ValueError(f"Invalid mark '{mark}': marks must be between 0 and 100.")

    # 4. Perform calculations
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


# ==========================================
# Test Suite
# ==========================================
if __name__ == "__main__":
    # Test 1: Single mark
    res_single = analyze_marks([75])
    assert res_single == {"average": 75.0, "highest": 75, "lowest": 75, "pass_rate": 100.0}

    # Test 2: Decimals
    res_decimal = analyze_marks([88.5, 92.0, 74.5])
    assert res_decimal["average"] == 85.0
    assert res_decimal["highest"] == 92.0
    assert res_decimal["lowest"] == 74.5

    # Test 3: Custom pass_mark
    res_custom = analyze_marks([40, 60, 80], pass_mark=70)
    assert res_custom["pass_rate"] == (1 / 3) * 100

    # Test 4: Empty list (Raises ValueError)
    try:
        analyze_marks([])
        assert False, "Should have raised ValueError for empty list"
    except ValueError:
        pass

    # Test 5: Text value inside list (Raises ValueError)
    try:
        analyze_marks([80, "ninety", 100])
        assert False, "Should have raised ValueError for string in marks"
    except ValueError:
        pass

    # Test 6: Out-of-range marks (< 0 or > 100) (Raises ValueError)
    try:
        analyze_marks([-5, 50, 70])
        assert False, "Should have raised ValueError for mark < 0"
    except ValueError:
        pass

    try:
        analyze_marks([50, 70, 105])
        assert False, "Should have raised ValueError for mark > 100"
    except ValueError:
        pass

    print("All required test cases passed successfully!")