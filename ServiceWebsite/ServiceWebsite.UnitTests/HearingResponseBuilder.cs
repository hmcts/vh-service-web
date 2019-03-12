using System.Collections.Generic;
using HearingsAPI.Client;

namespace ServiceWebsite.UnitTests
{
    /// <summary>
    /// Helper to build api responses for hearings
    /// </summary>
    internal class HearingResponseBuilder
    {
        private readonly List<ParticipantResponse> _participants = new List<ParticipantResponse>();

        private static int _idCounter;

        private int _id = _idCounter++;

        private string _caseName = "Mr A vs Mr B";

        public HearingResponseBuilder With => this;

        public HearingResponseBuilder Id(int id)
        {
            _id = id;
            return this;
        }

        public HearingResponseBuilder CaseName(string name)
        {
            _caseName = name;
            return this;
        }

        public HearingResponseBuilder AParticipant(string participantId)
        {
            _participants.Add(new ParticipantResponse
            {
                Username = participantId,
                Email = participantId
            });

            return this;
        }

        public HearingResponse Build()
        {
            return new HearingResponse
            {
                Id = _id,
                Cases = new List<CaseResponse>
                {
                    new CaseResponse { Name = _caseName }
                },
                Participants = _participants
            };
        }
    }
}