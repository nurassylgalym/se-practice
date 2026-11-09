import unittest
from booking import can_book

BASE = [(600, 660)]


class BookingTests(unittest.TestCase):
    def check(self, start, end, expected, blocked=False, existing=None, now=540):
        ex = BASE if existing is None else existing
        self.assertIs(can_book(start, end, now, blocked, ex), expected)

    def test_t1_touching_end_is_allowed(self):       self.check(660, 720, True)
    def test_touching_start_is_allowed(self):         self.check(560, 600, True)
    def test_t2_overlap_rejected(self):               self.check(630, 690, False)
    def test_inside_existing_rejected(self):          self.check(610, 650, False)
    def test_covers_existing_rejected(self):          self.check(590, 670, False)
    def test_t3_blocked_rejected(self):               self.check(660, 720, False, blocked=True)
    def test_t4_exactly_120_allowed(self):            self.check(720, 840, True)
    def test_t5_121_rejected(self):                   self.check(720, 841, False)
    def test_t6_starts_now_rejected(self):            self.check(540, 570, False)
    def test_starts_before_now_rejected(self):        self.check(500, 530, False, existing=[])
    def test_starts_one_after_now_allowed(self):      self.check(541, 570, True)
    def test_t7_reversed_rejected(self):              self.check(720, 660, False)
    def test_zero_length_rejected(self):              self.check(700, 700, False)
    def test_t8_ends_at_midnight_allowed(self):       self.check(1380, 1440, True)
    def test_t9_past_midnight_rejected(self):         self.check(1380, 1441, False)
    def test_negative_start_rejected(self):           self.check(-10, 30, False, now=-20)
    def test_start_zero_allowed_when_now_earlier(self): self.check(0, 60, True, existing=[], now=-1)
    def test_t10_second_booking_rejected(self):       self.check(720, 780, False, existing=[(600, 660), (700, 760)])
    def test_non_integer_rejected(self):              self.check(660.5, 720, False)

    def test_t11_same_check_twice_and_no_mutation(self):
        ex = [(700, 760), (600, 660)]  # unsorted on purpose
        copy = list(ex)
        self.assertIs(can_book(780, 840, 540, False, ex), True)
        self.assertIs(can_book(780, 840, 540, False, ex), True)
        self.assertEqual(ex, copy)


if __name__ == "__main__":
    unittest.main()