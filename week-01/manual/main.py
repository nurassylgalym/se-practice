def analyze_marks(marks):
    valid_marks = []
    
    for item in marks:
        try:
            # Приводим к числу
            val = float(item)
            # Проверяем диапазон [0, 100]
            if 0 <= val <= 100:
                valid_marks.append(val)
        except (ValueError, TypeError):
            continue

    # Если валидных оценок нет
    if not valid_marks:
        print("No valid marks found.")
        return

    total_valid = len(valid_marks)
    avg_score = round(sum(valid_marks) / total_valid, 2)
    highest_score = max(valid_marks)
    lowest_score = min(valid_marks)
    
    # Проходные оценки (>= 50)
    passing_marks = sum(1 for mark in valid_marks if mark >= 50)
    pass_rate = round((passing_marks / total_valid) * 100, 1)

    print(f"Valid marks: {total_valid}")
    print(f"Average: {avg_score:.2f}")
    print(f"Highest: {highest_score}")
    print(f"Lowest: {lowest_score}")
    print(f"Pass rate: {pass_rate:.1f}%")

if __name__ == "__main__":
    # Проверька все 4 кейса
    test_case_a = [85, 23, 45, 90, 92]
    analyze_marks(test_case_a)