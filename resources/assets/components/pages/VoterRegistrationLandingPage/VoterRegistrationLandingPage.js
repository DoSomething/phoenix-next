import React from 'react';
import PropTypes from 'prop-types';

import voteBoxImage from './vote-box.png';
import { query } from '../../../helpers/url';
import voteStickerImage from './vote-sticker.png';
import registerToVoteImage from './register-to-vote.png';
import Details from '../../utilities/FaqElements/Details';
import Summary from '../../utilities/FaqElements/Summary';
import weAreTheVotersImage from './we-are-the-voters.png';
import LinkButton from '../../utilities/Button/LinkButton';
import SiteFooter from '../../utilities/SiteFooter/SiteFooter';
import SiteNavigation from '../../SiteNavigation/SiteNavigation';
import DetailsParagraph from '../../utilities/FaqElements/DetailsParagraph';
import SocialShareTray from '../../utilities/SocialShareTray/SocialShareTray';
import StartVoterRegistrationForm from '../../utilities/StartVoterRegistrationForm/StartVoterRegistrationForm';

const MarkdownLink = ({ href, text }) => (
  <LinkButton
    className="inline text-blue-500 hover:text-blue-300 hover:underline p-0"
    href={href}
    text={text}
  />
);

MarkdownLink.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

const VoterRegistrationLandingPage = () => (
  <>
    <SiteNavigation />

    <main className="bg-white">
      <article data-testid="vr-landing-page">
        <img
          className="m-auto mt-5 max-w-full md:max-w-lg"
          src={registerToVoteImage}
          alt=""
        />

        <h1 className="mt-3 text-center text-lg" style={{ color: '#2f3db1' }}>
          Take 2 minutes to register to vote at your current address.
        </h1>

        <div className="relative max-w-6xl m-auto">
          <img
            src={voteBoxImage}
            className="absolute hidden lg:block w-56"
            style={{ top: '20%', left: '3%' }}
            alt="Ballot box adorned with 'vote' stickers"
          />

          <StartVoterRegistrationForm
            className="max-w-lg m-auto"
            contextSource="voter-registration-marketing-page"
            buttonColor="#322ba9"
            buttonText="Get Started"
            rQueryParam={query('r')}
          />

          <img
            src={voteStickerImage}
            className="absolute hidden lg:block w-40 top-0"
            style={{ right: '7%' }}
            alt=""
          />
        </div>

        <SocialShareTray
          className="text-center mt-10"
          // Pass through the current URL without the query parameters.
          shareLink={`${window.location.origin}${window.location.pathname}`}
          platforms={['facebook', 'twitter']}
        />

        <div className="mt-8 max-w-xl m-auto px-3">
          <h2 className="text-red-300 text-4xl font-normal font-league-gothic p-5">
            FAQs ABOUT VOTER REGISTRATION
          </h2>

          <Details>
            <Summary text="Does my vote actually matter?" />

            <DetailsParagraph>
              Yep, it definitely does! There are countless elections that have
              been decided by only a few votes. For example, a 2017 Virginia
              state election was tied, so the winner was selected{' '}
              <MarkdownLink
                href="https://www.npr.org/2018/01/04/573504079/virginia-republican-david-yancey-wins-tie-breaking-drawing"
                text="by drawing
              names out of a bowl."
              />{' '}
              Literally.
            </DetailsParagraph>

            <DetailsParagraph className="mt-0">
              In the 2020 elections,{' '}
              <MarkdownLink
                href="https://ballotpedia.org/United_States_Senate_election_in_Georgia,_2020_(Perdue_vs._Ossoff_runoff)"
                text="Georgia Sen. Jon Ossoff"
              />{' '}
              won his race by a margin of victory of .83% -- and experts think
              that{' '}
              <MarkdownLink
                href="https://circle.tufts.edu/latest-research/black-youth-play-major-role-democratic-victories-georgia-runoffs"
                text="young voters (Black youth in particular) were instrumental to his win."
              />{' '}
              You can expect similarly close races all over the country in the
              2022 elections.
            </DetailsParagraph>

            <DetailsParagraph className="mt-0">
              One vote matters. *Your* vote matters. And together, our votes
              have the collective power to decide the future of the country we
              want to see.
            </DetailsParagraph>
          </Details>

          <Details>
            <Summary text="How do I vote by mail?" />

            <DetailsParagraph>
              First step: make sure you’re registered to vote. Then, unless you
              live in a state that automatically mails voters ballots, you must{' '}
              <MarkdownLink
                href="https://www.vote.org/absentee-ballot/"
                text="fill out an absentee ballot application."
              />{' '}
              Once you receive your ballot in the mail, cast your vote by
              mailing it back or, in some cases, dropping it off at a vote
              center. Make sure to request and return your ballot before the
              respective{' '}
              <MarkdownLink
                href="https://www.vote.org/absentee-ballot-deadlines/"
                text="deadlines in your state."
              />
            </DetailsParagraph>

            <DetailsParagraph className="mt-0">
              Note: Due to COVID-19, many states temporarily changed their
              absentee ballot laws in 2020, and they may revert to previous
              guidelines in the 2022 elections.{' '}
              <MarkdownLink
                href="https://www.vote.org/absentee-voting-rules/"
                text="Be sure to stay up to date with your state’s regulations."
              />
            </DetailsParagraph>
          </Details>

          <Details>
            <Summary text="Am I registered to vote?" />

            <DetailsParagraph>
              You should always make sure that your address is up-to-date!{' '}
              <MarkdownLink
                href="https://am-i-registered-to-vote.org/dosomething/"
                text="Use
              this resource to check if you’re registered, need to update your
              address, and more"
              />
              . Oh! And if you re-register, there’s no penalty. Better safe than
              sorry, right?
            </DetailsParagraph>
          </Details>

          <Details>
            <Summary text="Can I register to vote without a driver's license?" />

            <DetailsParagraph>
              Yes! You can register to vote using a driver’s license number or
              another non-driver ID number (for example, a state ID card). If
              you don’t have a driver’s license or haven’t been issued a
              non-driver state ID card, states will allow you to register using
              the last four digits of your social security number (SSN), but you
              will have to <b>print, sign, and mail</b> in a paper version of
              the voter registration form to complete the process.
            </DetailsParagraph>
          </Details>

          <Details>
            <Summary text="I'm not 18, but I will be by Election Day (November 8, 2022). Can I still register to vote?" />

            <DetailsParagraph>
              It depends on your state. In most states, YES. In all but a few
              states, you can register to vote if you&apos;re younger than 18,
              as long as you’ll be 18 by Election Day. In others, you may need
              to be a certain age to register even if you&apos;ll be 18 by
              Election Day.
            </DetailsParagraph>

            <DetailsParagraph className="mt-0">
              <MarkdownLink
                href="https://www.usa.gov/voter-registration-age-requirements"
                text="Check your state’s age requirement rules"
              />{' '}
              to see if you qualify. If you do, register now -- it just takes 2
              minutes! And if you can’t vote this year, you can help your
              friends get registered.
            </DetailsParagraph>

            <DetailsParagraph className="mt-0">
              Some states even let 17-year-olds vote in primary elections if
              they&apos;ll be 18 by the general election --{' '}
              <MarkdownLink
                href="https://www.fairvote.org/facts_17_year_old_primary_voting"
                text="see if you qualify here."
              />
            </DetailsParagraph>
          </Details>

          <Details>
            <Summary text="How do I vote if I’m at college in a different state?" />

            <DetailsParagraph>
              You can register to vote for your home state or the state where
              you go to college -- but not both!
            </DetailsParagraph>

            <DetailsParagraph className="mt-0">
              If you’re registering to vote in the state where you attend
              college and you live in a dorm, you must put your physical dorm
              address on the form, and a PO box doesn’t count. (There’s a
              separate section on the form for you to include your mailing
              address, in case that’s different from your dorm address.)
            </DetailsParagraph>

            <DetailsParagraph className="mt-0">
              If you’re registering to vote in your home state, be prepared to
              travel home to cast your ballot or mail in an absentee ballot.
              <MarkdownLink
                href="https://www.vote.org/absentee-voting-rules/"
                text="Learn more about early and absentee voting here."
              />
            </DetailsParagraph>
          </Details>

          <Details>
            <Summary text="What is voter pre-registration?" />

            <DetailsParagraph>
              In{' '}
              <MarkdownLink
                href="https://www.usa.gov/voter-registration-age-requirements"
                text="some states"
              />
              , you can pre-register to vote when you are 16 or 17. Then on your
              18th birthday, your voter registration will be automatically
              processed. This is a great way to ensure you don’t miss
              registration deadlines, but be sure to update your
              pre-registration if your address changes before you turn 18.
            </DetailsParagraph>
          </Details>

          <Details>
            <Summary text="When are my elections?" />

            <DetailsParagraph>
              There are hundreds of local elections in each state. When you
              register, our friends at Rock The Vote can send you reminders
              about when elections are coming up in your state or city.
            </DetailsParagraph>
          </Details>
        </div>

        <img
          src={weAreTheVotersImage}
          className="w-2/3 md:w-1/3 lg:w-2/12 m-auto"
          alt=""
        />
      </article>
    </main>

    <SiteFooter />
  </>
);

export default VoterRegistrationLandingPage;
