raw = input("Enter marks separated by spaces or commas: ")
cleaned = raw.replace(",", " ").split()

valid = []
for item in cleaned:
    try:
        val = float(item)
        if 0 <= val <= 100:
            valid.append(val)
    except ValueError:
        pass

if not valid:
    print("No valid marks found.")
else:
    count = len(valid)
    avg = round(sum(valid) / count, 2)
    high = max(valid)
    low = min(valid)
    passed = sum(1 for m in valid if m >= 50)
    pass_rate = round((passed / count) * 100, 1)

    print(f"Number of valid marks: {count}")
    print(f"Average: {avg:.2f}")
    print(f"Highest: {high}")
    print(f"Lowest: {low}")
    print(f"Pass rate: {pass_rate:.1f}%")
