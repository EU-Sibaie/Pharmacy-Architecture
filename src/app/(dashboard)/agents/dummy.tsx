export const agents = [
  {
    id: 1,
    event: 'call_analyzed',
    call: {
      agent_id: 'agent_a3b93dc06777acc98ed387444c',
      agent_name: 'Single-Prompt Agent',
      call_status: 'ended',
      transcript:
        "Agent: Hello, this is Euphrates Pharmacy how can I help you today?\nUser: Hey. How are you?\nAgent: I'm doing well, thank you! How can I assist you today? Are you calling about a specific weight-loss treatment or something else?\nUser: Weight loss treatment. My I'm calling about Ozempic. I actually have an order with you.\nUser: I'm a patient already.\nUser: My name is Abdul Nafizabai.\nUser: and my date of birth is third of July two thousand and three.\nAgent: Thank you, Abdul. Is it okay if I ask a few quick questions to help get you to the right next step?\nUser: Yes, please.\nAgent: Great! Are you calling to check your eligibility, book a consultation, switch your medication to our pharmacy, or track a FedEx shipment?\nUser: Try to get a.\nAgent: Would you like to check your eligibility, book a consultation, switch your medication to our pharmacy, or track a FedEx shipment?\nUser: Track a FedEx shipment.\nAgent: Do you have your order number, or can I verify with your name, date of birth, and ZIP code?\nUser: My name is Abdul Date of birth is started July two thousand and three, and the ZIP code is six five four zero one.\nAgent: I'll check the status of your FedEx shipment now. Please hold for a moment.\n",
      recording_url:
        'https://d1d33audaiiiuu.cloudfront.net/eb679333ee68083d7bf69ac96794593636404ac555b83d3f201332489bda5080/recording.wav?Expires=1759792006&Key-Pair-Id=K3ETYG3FHFNIMP&Signature=lhd8rqzzLP1NaPcOCEdsGYMqyLyUxRVOdi3d76nh2uELJALbYnVw2hlsnxmz66K4xiH7wLdDos7f7JLe8IreO-~qMoNEUlk9dGKZu1bLH2IbFAf5m~Cq-ThEdu3cJwGc5WCuAMBDMoEaqdUxguXpnpWACzjaPgVT97nPLm2ylvdiefe-HfqtqPp5wTCMNCF2BfcVlpaCpeP2XhIPrcxdhMXDFzUALMjrQeAuui8PExDJKz9rH0Yg8QEHM0KnAkyWy8U4AuWUsPYp2O7XsFGM9VJ5o2NvZiUTtQEBnnqVbH9uKaznLtojSju2Irhsc5vGFiOLBc4aJO8lPFJ2uqzlUw__',
      disconnection_reason: 'agent_hangup',
      call_cost: {
        product_costs: [
          {
            product: 'openai_tts',
            unit_price: 0.1333333,
            cost: 11.6,
          },
          {
            product: 'gpt_4_1_mini_high_priority',
            unit_price: 0.01,
            cost: 0.87,
          },
          {
            product: 'us_twilio_telephony',
            unit_price: 0.025,
            cost: 2.175,
          },
          {
            product: 'background_voice_cancellation',
            unit_price: 0.0083333,
            cost: 0.725,
          },
        ],
        total_duration_seconds: 87,
        total_duration_unit_price: 0.1766667,
        combined_cost: 15.37,
      },
      call_analysis: {
        call_summary:
          'The user, Abdul Nafizabai, called Euphrates Pharmacy to track a FedEx shipment related to his order for Ozempic. The agent confirmed his identity and was in the process of checking the shipment status when the call ended.',
        in_voicemail: false,
        user_sentiment: 'Neutral',
        call_successful: false,
        custom_analysis_data: {},
      },
      opt_out_sensitive_data_storage: true,
      data_storage_setting: 'basic_attributes_only',
      opt_in_signed_url: true,
      from_number: '+16304088424',
      to_number: '+18324021645',
      direction: 'inbound',
      telephony_identifier: {
        twilio_call_sid: 'CA5e14415d9d6ef8a648a22c7ae35e5a9c',
      },
    },
  },
];
