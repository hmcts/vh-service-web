const ContactPhoneNumber = '0300 303 0655'; // it's default, will be set from config value

export let LocaleResources = {
  EN: {
    // Check equipment
    AboutYourEquipment: 'About your equipment',
    WeWillUseThisInformation: 'We will use this information to check if our service is compatible with your computer.',
    CheckEquipmentThankYou: 'Thank you. We have gathered the information we need. ' +
      'We will check compatibility when you submit this form.',
    ErrorMessageDeviceType: 'Our service is not compatible with the device you are using. ' +
      'You can use laptop or desktop computer for a video hearing, but not a smartphone or tablet. ' +
      'Please sign out and sign back in using the computer you would use on the day of your hearing.',
    Devices: {
      Mobile: 'Mobile',
      Tablet: 'Tablet',
      Computer: 'Computer'
    },
    InternetSpeed: 'Internet speed',
    DeviceType: 'Device type',
    Browser: 'Browser',
    CameraAndMicrophonePresent: 'Camera and microphone present',
    CameraPresent: 'Camera present',
    CameraNotPresent: 'Camera not present',
    MicrophonePresent: 'Microphone present',
    MicrophoneNotPresent: 'Microphone not present',
    CannotGetDeviceInfo: 'Can not get devices information',
    Download: 'download',
    Upload: 'upload',
    // About your client
    AboutYouAndYourClient: 'About you and your client',
    WillYourClient: 'Will your client be attending the hearing with you?',
    AboutClientQuestionYes: 'Yes, my client will attend and will be sitting with me',

    // Use same computer.
    SameComputerConfirmationText: 'Please confirm you are using the same computer you would use for the hearing.',
    SameComputerQuestion: 'Is this the same computer you would use for the hearing?',
    SameComputerYesText: 'Yes, this is the same computer',
    SameComputerNoText: 'No, I would use a different computer',
    // Use same computer - signout
    SignoutMessage: 'Please continue the suitability check on the computer you would use for the hearing.',
    // Access to a room.
    SuitableRoom: 'Access to a room',
    ChoosingARoom: 'Choosing a room',
    DayOfHearing: 'On the day of the hearing, will you have access to a room:',
    RoomAccessCheckList1: 'where your client can sit alongside you (if they are attending)?',
    RoomAccessCheckList2: 'that is bright enough for you to be seen clearly?',
    RoomAccessCheckList3: 'where your computer can connect to the internet?',
    RoomAccessCheckList4: 'where you will not be disturbed?',
    PrivateRoom: 'Please choose a quiet, private room. An open office would not be suitable for a video hearing.',
    SeatingArrangement: 'If possible, please sit in front of a plain wall. This will allow you to be seen more clearly.',
    // common
    Yes: 'Yes',
    No: 'No',
    Continue: 'Continue',
    Save: 'Save',
    PleaseAnswerThisQuestion: 'Please answer this question',
    PleaseSignout: 'Please sign out',
    // Ability to takepart
    AboutYou: 'About you',
    PleaseComplete: 'Please complete this question',
    IsThereAnything: 'Is there anything that could affect your ability to take part in a video hearing?',
    ForExample: {
      Heading: 'For example:',
      Example1: 'are you hard of hearing or deaf?',
      Example2: 'are you blind or partially sighted?',
      Example3: 'something else?'
    },
    ProvideMoreInfo: 'Please provide more information',
    // Is Hearing Suitable for Video
    HearingSuitability: 'Hearing suitability',
    Basedonyourknowledge: 'Based on your knowledge of this case and your client, do you consider this a suitable ' +
      'candidate for video hearing?',
    Pleasetelluswhy: 'Please tell us why',
    PleaseExplainWhy: 'Please explain why',
    // check-suitability-for-video
    HearingSuitabilityCheck: 'Hearing suitability check',
    HearingSuitabilityParagraphOne: 'Video hearings are a new service which allow you to be seen and heard in court ' +
      'without having to travel. All parties, including the judge, sign in from a computer and can see each other on ' +
      'the screen throughout the hearing.',
    HearingSuitabilityParagraphTwo: 'Help us check if video is suitable for this hearing by:',
    HelpUsCheckSuitabilityForYouAndClient: 'Video hearings are a new service. Help us check if a video hearing is suitable' +
      'for you and your client by: ',
    SuitabilityTestPoints: {
      AnsweringQuestions: 'answering some questions about yourself and your client',
      AllowUsToRunTests: 'allowing us to run a compatibility check on your computer'
    },
    StartNow: 'Start now',
    // Check list thank you
    Thankyou: 'Thank you',
    Receivedyouranswers: 'We have received your answers',
    Whathappensnext: 'When we have received answers from all parties we will contact you about what happens next.',
    FeedbackString1: 'This is a new service – your ',
    FeedbackString2: 'feedback',
    FeedbackString3: ' will help us improve it.',
    // Will your client need interpreter
    WillYourClientNeedInterpreter: 'If your client is attending the hearing will they need an interpreter?',
    // Check your answers.
    // About your equipment
    WeareNowGoingToDetect:
    {
      Heading: 'We are now going to detect:',
      Detect1: 'your internet speed',
      Detect2: 'the type of computer you are using',
      Detect3: 'the browser you are using to access the internet',
      Detect4: 'whether your computer has a camera and microphone',
    },
    WeCanDetectAutomatically: 'We can detect this information automatically.',
    WhyDoYouNeedToFindout: 'Why do you need to find out about my equipment?',
    CheckCompatability: 'We need to check that a video hearing service is compatible with your computer. ' +
      'To do this, we need to find out some information about the computer you are using.',
    CheckYourAnswers: 'Check your answers',
    YourQuestions: 'You have answered the following questions',
    YourAnswers: 'Your answers',
    CheckAnswers: {
      SuitableRoom: 'Will you have access to a suitable room?',
      AbilityVideoHearing: 'Is there anything that could affect your ability to take part in a video hearing?',
      ClientAttendance: 'Will your client be attending the hearing with you?',
      NeedInterpreter: 'If your client is attending  will they need an interpreter?',
      IsVideoHearingSuitable: 'Do you consider the hearing suitable for a video hearing?',
      OtherInformation: 'Is there anything else you would like to draw to the court\'s attention?',
    },
    Change: 'Change',
    SubmitMyAnswers: 'Send your answers',
    CheckCameraAndMicrophone: 'We also need to check that your computer has a camera and microphone so that you ' +
      'can be seen and heard during your hearing.',
    StartCompatibilityChecks: 'Start compatibility checks',
    // Citizen pages.
    Next: 'Next',
    AboutHearings: {
      ParagraphOne: 'Hearings in today\'s courts and tribunals can take place in different ways.',
      ParagraphTwo: 'Attending a hearing does not always involve travelling to court.'
    },
    DifferentHearingTypes: {
      Intro: 'Hearings can take place:',
      TitleOne: 'In a court:',
      ParagraphOne: 'At a hearing in court, all participants assemble in the courtroom in front of the judge.',
      TitleTwo: 'By phone:',
      ParagraphTwo: 'These hearings usually take place by conference call. All participants, including the judge,' +
        ' dial into the secure conference line from different locations.',
      TitleThree: 'By video:',
      ParagraphThree: 'Video hearings allow you to be seen and heard in court without having to travel. All participants,' +
        ' including the judge, sign in from a computer and can see each other on the screen throughout the hearing.',
    },
    ContinueToQuestions: {
      ParagraphOne: 'The court will decide which type of hearing is most suitable for the case and for everyone taking part.',
      ParagraphTwo: 'We now need to ask you some questions to find out which type will be most suitable for you.',
      ContinueToQuestions: 'Continue to questions',
    },
    Interpreter: {
      AbleToGetInterpreter: 'If you would find it difficult to take part in your hearing in English, ' +
        'you may be able to get an interpreter.',
      WillYouNeedInterpreter: 'Will you need an interpreter for your hearing?',
      AskJudgeAboutInterpreter: ' You must ask the judge for permission before the hearing. ' +
        'Contact the court or tribunal dealing with your case.',
      GettingInterpreter: 'Getting an interpreter at your hearing',
      ActAsYourInterpreter: 'You might be able to get a friend or family member to act as your interpreter.',
    },
    // Citizen access to a room.
    CitizenSuitableRoom: {
      Title: 'Access to a room (for a telephone or video hearing)',
      Paragraph1: 'To join a hearing from outside the courtroom you will need access to a quiet, private room.' +
        ' This could be in your home or an office.',
      Paragraph2: 'On the day of your hearing, will you have access to a suitable quiet, private space:',
      Question1: 'that is bright enough for you to be seen clearly?',
      Question2: 'where you will not be disturbed?',
      Question3: 'where your computer can connect to the internet if required?',
      ChoosingARoomParagraph: 'It\'s important you can concentrate during a hearing.' +
        ' An open office or public library is not suitable because you may be distracted.',
    },
    // Citizen Equipment check.
    CitizenAboutEquipment: {
      Paragraph1: 'In the room you would use for a telephone or video hearing, will you have access to:',
      AnswerHint: 'Please select all that apply',
      Device1: 'a phone (mobile or landline)',
      Device2: 'an internet connection',
      Device3: 'a laptop',
      Device4: 'a desktop computer',
      CameraQuestion: 'Does your desktop computer have a camera?',
      CameraAnswer: 'I\'m not sure',
      NoDevice: 'None of the above (checking this box will remove any selections you have made above)',
      EquipmentQuestion: 'What if I\'m not sure whether my computer has a camera and microphone?',
      EquipmentAnswer: 'Don\'t worry. You\'ll be able to test this later by making a simple practice call.',
    },
    // Citizen Consent.
    CitizenConsent: {
      Title: 'Your consent for a video hearing',
      Paragraph1: 'Video hearings are a new service and you would be using your own equipment.' +
        ' If the court decides  a video hearing is most suitable, we need to find out if you would be content to take part in this way.',
      Paragraph2: 'Would you be content to take part in the hearing by video?'
    },
    // Citizen Check your answers.
    CitizenCheckAnswers: {
      Question1: 'Is there anything the court should be aware of when it decides which type of hearing will be suitable?',
      Question2: 'Will you need an interpreter for your hearing?',
      Question3: 'On the day of your hearing, will you have access to a suitable room?',
      Question4: 'On the day of the hearing, will you have access to a phone?',
      Question5: 'On the day of the hearing, will you have access to an internet connection?',
      Question6: 'On the day of the hearing, will you have access to a laptop?',
      Question7: 'On the day of the hearing, will you have access to a desktop computer with a camera?',
      Question8: 'Are you content to participate in the hearing by video, if required?',
    },
    // Citizen Thank you page.
    CitizenThankYou: {
      ParagraphOne: 'The court will use the information you have provided to decide which type of hearing is most suitable.',
      ParagraphTwo: 'All parties involved in the hearing must submit their answers before the court can make a decision.',
    },
    // Citizen footer.
    CitizenFooter: {
      FooterTitle: 'Contact us for help',
      TitleOne: 'Telephone:',
      FooterParagraphOne: 'Call us on 0300 303 0655 and quote your reference number ',
      HintOne: '(available between 9am and 5pm, Monday to Friday)',
      TitleTwo: 'Email:',
      FooterEmailUs: 'Email us at',
      FooterParagraphTwo: ' quoting your reference number'
    },
    HMCTS: 'HMCTS',
    ForExampleCitizen: {
      Heading: 'For example:',
      Example1: 'are you hard of hearing or deaf?',
      Example2: 'are you blind or partially sighted?',
      Example3: 'do you have a learning disability or sometimes struggle to understand everyday things?',
      Example4: 'something else?'
    },
    IsThereAnythingCitizen: 'Is there anything that the court should be aware of when it decides which type of hearing' +
      'will be most suitable?',
    Errors: {
      PageNotFound: {
        Title: 'Page not found',
        Paragraph1: 'If you typed the web address, check it is correct.',
        Paragraph2: 'If you pasted the web address, check you copied the entire address.',
        Paragraph3: 'If the web address is correct or you selected a link or button, contact us using the options below.',
      },
      ServiceError: {
        Title: 'Sorry, there is a problem with the service',
        Paragraph1: 'Please try again later.',
        Paragraph2: 'If you need to speak to someone please contact us using the options below.',
      },
      UnauthorisedUse: {
        Title: 'You are not authorised to use this service',
        Paragraph1: 'It looks like you are not registered for this service.',
        Paragraph2: 'If you think this is a mistake and you need to speak to someone, please contact us using the options below.',
      },
      FooterParagraph: 'Call us on 0300 303 0655',
    },
    SignOutConfirmation: 'You have not yet submitted your answers. ' +
      'If you sign out now your answers will be lost and you will need to start again.',
    ConfirmSignOut: 'Confirm sign out',
    CancelSignOut: 'Cancel sign out',
    Guidance: {
      GuidanceTitle: 'A guide to video hearings',
      Paragraph: 'This guide explains how video hearings work and provides information you might need to participate.',
      Contents: 'Contents',
      PrintGuide: 'Print the entire guide',
      ContentIndex: [
        {
          Index: 1,
          Content: 'What is a video hearing?',
          Text: ['A video hearing allows you to be seen and heard in court without having to travel. '
            + 'All participants sign in from a computer and can see each other on the screen throughout the hearing.']
        },
        {
          Index: 2,
          Content: 'Why some hearings take place by video',
          Text: ['Having a hearing by video can be more convenient than travelling to court. '
            + 'Some participants may also find it less stressful.']
        },
        {
          Index: 3,
          Content: 'Equipment you will need',
          Text: ['You’ll need a laptop or desktop computer with an internet connection, camera and microphone. '
            + 'Video hearings do not work on tablets or smartphones. ',
            'You’ll also need a phone to hand in case there are technical problems.'
          ]
        },
        {
          Index: 4,
          Content: 'Choosing a room',
          Text: ['It’s important that you can concentrate during your video hearing. '
            + 'You’ll need to choose a quiet, private room where it’s bright enough for you to be seen clearly. ',
            'You can join from your own home or from someone else’s home. An open office or public library' +
            'is not suitable because you may be distracted.'
          ]
        },
        {
          Index: 5,
          Content: 'Where to sit',
          Text: ['Please sit in front of a wall that’s as plain as possible. '
            + 'This will help the other participants focus on you and what you’re saying.',
            'Try to sit facing a window, not with your back to it.'
          ]
        },
        {
          Index: 6,
          Content: 'Rules you must follow',
          Text: ['Video hearings are just as serious as hearings that take place in a courtroom,' +
                'so you’ll need to follow the same rules.'],
          ListTitle: ' This means you:',
          List: [
            'can only drink water',
            'must not eat',
            'must only use your phone for the purposes of the hearing',
            'must follow the judge’s orders',
            'are not allowed to smoke(including e- cigarettes)',
            'must be alone, unless you have the judge’s permission to have someone with you',
            'must ask the judge’s permission if you need to move away from your screen for any reason'
          ]
        },
        {
          Index: 7,
          Content: 'What happens on the day of your hearing',
          Text: ['Please sign into our website 20 minutes before your hearing is due to begin. '
            + 'You’ll go through some basic computer checks to be sure you’ll be seen and heard during your hearing. ',
            'When all participants are ready, the judge will start the hearing.You’ll see a countdown timer ' +
            'that gives you 60 seconds to prepare yourself. '
          + 'When the judge starts the hearing, everyone will appear on the screen at the same time. ',
          'You’ll be able to see and hear everyone who is there. '
          + 'They’ll also be able to see and hear you.']
        },
        {
          Index: 8,
          Content: 'What happens if there are connection problems?',
          Text: ['If you have connection problems, the judge will pause the hearing. '
            + 'Please call a hearings officer on ' + ContactPhoneNumber + ' and they will help you solve the problem. '
            + 'The judge will then restart the hearing. ',
            'We will do everything we can to fix any connection problems but if the hearing cannot resume, it will be rescheduled.'
          ]
        },
        {
          Index: 9,
          Content: 'Help and support',
          Text: ['A hearings officer will be available on the day of your hearing. '
            + 'Hearings officers have a dedicated phone number so you will not be kept waiting in a queue. '
            + 'You can call a hearings officer on ' + ContactPhoneNumber + '. ',
          'During your hearing, the judge will explain what you need to do. '
          + 'They’ll let you know when it’s your turn to speak or answer a question.'
          ]
        },
      ]
    },
    CheckListAlreadySubmited:
    {
      Heading: 'You have already sent us your answers',
      Paragraph: 'Please contact us if you would like to discuss or change your answers.'
    },
    // Professional Equipment check.
    ProfessionalAboutEquipment: {
      Paragraph1: 'On the day of the hearing, will you have access to:',
      EquipmentAnswer: 'You\'ll be able to test this later by making a simple practice call.',
      Question7: 'On the day of the hearing, will you have access to a desktop computer with a camera?',
    },
    // Other information.
    OtherInformation: {
      Title: 'Other information',
      Question: 'Is there anything else you would like to draw to the court\'s attention?',
      Answer: 'For example:',
      Answer1: 'do you plan to instruct counsel for this hearing and not attend yourself?',
      Answer2: 'would you like to nominate someone else in your firm to carry out a technical check on your computer?' +
        ' If so, please provide their contact details.',
      Hint: 'Please record other information here',
    },
  }
};
