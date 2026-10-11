import unittest
from booking import can_book

# Base input unless a test says otherwise: now=540, blocked=False, existing=[(600, 660)]


class TestCanBook(unittest.TestCase):

    def test_01_touching_endpoints(self):
        self.assertIs(can_book(660, 720, 540, False, [(600, 660)]), True)

    def test_02_overlap(self):
        self.assertIs(can_book(630, 690, 540, False, [(600, 660)]), False)

    def test_03_blocked(self):
        self.assertIs(can_book(660, 720, 540, True, [(600, 660)]), False)

    def test_04_exactly_2_hours(self):
        self.assertIs(can_book(720, 840, 540, False, [(600, 660)]), True)

    def test_05_over_2_hours(self):
        self.assertIs(can_book(720, 841, 540, False, [(600, 660)]), False)

    def test_06_starts_now(self):
        # AC1: the start must be strictly in the future, so start == now is rejected
        self.assertIs(can_book(540, 570, 540, False, [(600, 660)]), False)

    def test_07_starts_in_past(self):
        self.assertIs(can_book(539, 570, 540, False, [(600, 660)]), False)

    def test_08_zero_length(self):
        self.assertIs(can_book(600, 600, 540, False, [(600, 660)]), False)

    def test_09_reversed_times(self):
        self.assertIs(can_book(700, 600, 540, False, [(600, 660)]), False)

    def test_10_day_bounds_midnight(self):
        self.assertIs(can_book(1320, 1440, 540, False, []), True)

    def test_11_exceeds_midnight(self):
        self.assertIs(can_book(1320, 1441, 540, False, []), False)

    def test_12_multiple_existing_no_overlap(self):
        self.assertIs(can_book(720, 780, 540, False, [(600, 660), (800, 860)]), True)

    def test_13_existing_list_unchanged(self):
        existing = [(600, 660)]
        copy = list(existing)
        can_book(660, 720, 540, False, existing)
        self.assertEqual(existing, copy)

    def test_14_touching_left_and_right(self):
        self.assertIs(can_book(600, 660, 540, False, [(540, 600), (660, 720)]), True)

    def test_15_starts_one_after_now(self):
        self.assertIs(can_book(541, 570, 540, False, [(600, 660)]), True)

    def test_16_new_covers_existing(self):
        self.assertIs(can_book(590, 670, 540, False, [(600, 660)]), False)

    def test_17_existing_covers_new(self):
        self.assertIs(can_book(620, 680, 540, False, [(600, 720)]), False)

    def test_18_identical_interval(self):
        self.assertIs(can_book(600, 660, 540, False, [(600, 660)]), False)

    def test_19_overlap_left_side(self):
        self.assertIs(can_book(570, 630, 540, False, [(600, 660)]), False)

    def test_20_overlap_only_with_last_booking(self):
        self.assertIs(can_book(720, 780, 540, False, [(600, 660), (700, 760)]), False)

    def test_21_overlap_only_with_second_booking(self):
        self.assertIs(can_book(790, 850, 540, False, [(600, 660), (800, 860)]), False)

    def test_22_start_at_zero_now_zero(self):
        self.assertIs(can_book(0, 60, 0, False, []), False)

    def test_23_end_exactly_1440_ok(self):
        self.assertIs(can_book(1380, 1440, 540, False, []), True)

    def test_24_blocked_without_overlap(self):
        self.assertIs(can_book(720, 780, 540, True, []), False)

    def test_25_empty_existing_valid_request(self):
        self.assertIs(can_book(600, 660, 540, False, []), True)
        
    def test_26_end_over_midnight_short_request(self):
        # duration is 50, so AC2 does not reject it: only the 1440 bound can
        self.assertIs(can_book(1400, 1450, 540, False, []), False)

    def test_27_existing_order_and_content_unchanged(self):
        for start, end in [(700, 760), (610, 650)]:
            existing = [(800, 860), (600, 660)]
            copy = list(existing)
            can_book(start, end, 540, False, existing)
            self.assertEqual(existing, copy)

if __name__ == '__main__':
    unittest.main()