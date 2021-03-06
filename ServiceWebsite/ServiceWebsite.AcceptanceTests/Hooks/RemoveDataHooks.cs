﻿using System;
using System.Collections.Generic;
using System.Data;
using AcceptanceTests.Common.Api.Hearings;
using AcceptanceTests.Common.Api.Helpers;
using BookingsApi.Contract.Responses;
using FluentAssertions;
using ServiceWebsite.AcceptanceTests.Helpers;
using TechTalk.SpecFlow;

namespace ServiceWebsite.AcceptanceTests.Hooks
{
    [Binding]
    public sealed class RemoveDataHooks
    {
        private string _username;

        [BeforeScenario(Order = (int)HooksSequence.RemoveDataHooks)]
        [AfterScenario]
        public void RemovePreviousHearings(TestContext context)
        {
            if (context?.Users == null) return;
            if (context.Users?.Count == 0) return;
            _username = Users.GetUserNameForJOH(context.Users) ?? Users.GetUserName(context.Users);
            ClearHearingsForUser(context.Api);
            UserShouldNotHaveAnswers(context.Api);
        }

        private void ClearHearingsForUser(TestApiManager api)
        {
            var response = api.GetHearingsByUsername(_username);
            var hearings = RequestHelper.Deserialise<List<HearingDetailsResponse>>(response.Content);
            if (hearings == null) return;

            foreach (var hearing in hearings)
            {
                DeleteTheHearing(api, hearing.Id);
            }
        }

        private static void DeleteTheHearing(TestApiManager api, Guid hearingId)
        {
            var response = api.DeleteHearing(hearingId);
            response.IsSuccessful.Should().BeTrue($"Hearing {hearingId} has been deleted. Status {response.StatusCode}. {response.Content}");
        }

        private void UserShouldNotHaveAnswers(TestApiManager api)
        {
            var response = api.GetSuitabilityAnswers(_username);
            var answers = RequestHelper.Deserialise<List<PersonSuitabilityAnswerResponse>>(response.Content);

            if (answers?.Count > 0)
            {
                throw new DataException($"user with username '{_username}' has {answers.Count} previous answer(s) saved");
            }
        }
    }
}
