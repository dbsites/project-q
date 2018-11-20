/**
 * @module FAQ.tsx
 * @description Frequently Asked Questions Presentation Component
 */

import * as React from 'react';

import Header from '../containers/HeaderContainer';

const FAQ = () => {
  return (
    <div className="main-dashboard">
      <div className="header">
        <Header />
      </div>
      <div className="dashboard-header dashboard-terms-header">
        <span>
          Frequently Asked Questions
        </span>
      </div>
      <div className="terms-dashboard-container">
        <div className="terms-header">
          What is Ethiq?
        </div>
        <p>
          Ethiq® is a tool designed to guide you towards investments more aligned with your beliefs and values. Our core mission is transparency through objective, factual data.
        </p>
        <div className="terms-header">
          How does Ethiq match me with compatible investments/companies?
        </div>
        <p>
          A user first chooses from a list of 12 issues (up to 6). These issues represent those that resonated most with the American public in the most recent presidential election. Once issues are selected, targeted questions appear in order to gauge which side of each issue a user identifies with.  As you do this, Ethiq’s propriety algorithm tracks money given in support/opposition of legislation, lobbying efforts and other metrics related to these issues. By cross-referencing your unique responses with this dataset, Ethiq can output overall and issue-based scores for each company. Currently, Ethiq offers customized rankings of every company listed in the S&P500.
        </p>
        <div className="terms-header">
          Where does Ethiq lean on the political spectrum – across political positions, ideologies and party lines?
        </div>
        <p>
          Ethiq is a tool designed for Republicans, Democrats, Liberals, Conservatives, and everyone in between. There are values-driven investors on all sides of the political spectrum. The results Ethiq outputs, depending on your unique responses, should be equally valid to every user.
        </p>
        <div className="terms-header">
          Where does Ethiq’s data come from?
        </div>
        <p>
        Ethiq’s data is primarily sourced from Federal Election Commission and IRS 527 filings, with additional data and assistance from the National Institute for Money in State Politics (<a href="https://www.followthemoney.org/" target="_blank">www.followthemoney.org</a>).
        </p>
        <div className="terms-header">
          Why should I trust Ethiq’s rankings?
        </div>
        <p>
          Every attempt has been made to present prompts and results in the most unbiased way possible. However, creating a ranking engine such as our requires different datasets to be weighted against each other. For example, Ethiq must consider the effects of money originating directly from a company’s associated PAC to a candidate vs. money that first flows through a committee or party before reaching a candidate. Or, money that was routed to a candidate from a company’s associated PAC 5 years ago vs. 5 months ago. Since there is no “right” or “wrong” answer on how to weight these factors, Ethiq starts with a set of weighting factors, and uses your input and feedback to further refine our engine, and your scores. The more users provide input and validation, the stronger the ranking engine becomes.
        </p>
        <div className="terms-header">
          I thought corporations weren’t allowed to give money directly to federal candidates and officeholders. Is this true?
        </div>
        <p>
          True. Although certain states allow corporations to give money directly to candidates and incumbents, this is not allowed at the federal level. Ties between corporations and federal officeholders are made via a company’s associated Political Action Committees (PACs) and executive-level employees.
        </p>
        <div className="terms-header">
          When can I download the Ethiq app?
        </div>
        <p>
          A mobile-ready version of Ethiq’s app, which will be available for both iOS and Android, is currently in development.
        </p>
        <div className="terms-header">
          Who do I contact with questions, complaints or suggestions?
        </div>
        <p>
          Ethiq welcomes your feedback! Please email us at <a href="mailto:info@ethiq.org">info@ethiq.org</a> or use the feedback form on our main page.
        </p>
      </div>
    </div>
  )
};

export default FAQ;
