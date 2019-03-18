using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Moq;
using ServiceWebsite.UnitTests;

namespace ServiceWebsite.UnitTests
{
    /// <summary>
    /// Helper to mock responses from the api for hearings
    /// </summary>
    internal class HearingsApiResponseBuilder
    {
        private readonly List<HearingResponseBuilder> _hearings = new List<HearingResponseBuilder>();
         private readonly HearingsApiAction _mockAction;

        private HearingsApiResponseBuilder(HearingsApiAction mockAction)
        {
          _mockAction = mockAction;
        }

        private enum HearingsApiAction
        {
            HearingsToday
        }

        public HearingResponseBuilder AHearing
        {
            get
            {
                var hearing = new HearingResponseBuilder();
                _hearings.Add(hearing);
                return hearing;
            }
        }

        public static HearingsApiResponseBuilder ForHearingsToday()
        {
            return new HearingsApiResponseBuilder(HearingsApiAction.HearingsToday);
        }

        public HearingsApiResponseBuilder ResponseContains(Action<HearingsApiResponseBuilder> builder)
        {
            builder(this);
            return this;
        }

        public void Mock()
        {
            switch (_mockAction)
            {
                case HearingsApiAction.HearingsToday:
                    var today = DateTime.UtcNow.Date;
                    var hearings = _hearings.Select(x => x.Build()).ToList();
                    break;
                default:
                    throw new NotImplementedException(
                        $"Seems like you've missed implementing {_mockAction} as a valid mock action.");
            }
        }
    }
}