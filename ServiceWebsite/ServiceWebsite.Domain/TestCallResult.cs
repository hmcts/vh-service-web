namespace ServiceWebsite.Domain
{
    public class TestCallResult
    {
        public TestScore Score { get; private set; }
        public bool Passed { get; private set; }

        public TestCallResult(bool passed, TestScore score)
        {
            Passed = passed;
            Score = score;
        }
    }
}