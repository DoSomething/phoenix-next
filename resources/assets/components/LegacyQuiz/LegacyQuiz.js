import React from 'react';
import { find } from 'lodash';
import PropTypes from 'prop-types';

import Question from './Question';
import Conclusion from './Conclusion';
import Share from '../utilities/Share/Share';
import ContentfulEntry from '../ContentfulEntry';
import { trackAnalyticsEvent } from '../../helpers/analytics';
import TextContent from '../utilities/TextContent/TextContent';

import './legacy-quiz.scss';

const LegacyQuiz = props => {
  const {
    id,
    fields,
    data,
    completeQuiz,
    pickQuizAnswer,
    submitButtonText,
  } = props;
  const { error, shouldSeeResult, selectedResult } = data;

  const introduction = shouldSeeResult ? null : (
    <TextContent className="quiz__description">
      {fields.introduction}
    </TextContent>
  );

  const questions = shouldSeeResult
    ? null
    : fields.questions.map(question => (
        <Question
          key={question.id}
          pickQuizAnswer={pickQuizAnswer}
          quizId={id}
          activeAnswer={data.questions ? data.questions[question.id] : null}
          {...question}
        />
      ));

  const quizError = error ? <p className="quiz__error">{data.error}</p> : null;

  const submitConclusion = shouldSeeResult ? null : (
    <Conclusion callToAction={fields.callToAction}>
      <button
        type="submit"
        className="button quiz__submit"
        onClick={() => completeQuiz(id)}
      >
        {submitButtonText || LegacyQuiz.defaultProps.submitButtonText}
      </button>
    </Conclusion>
  );

  const shareConclusion = shouldSeeResult ? (
    <Conclusion callToAction={fields.conclusion}>
      <Share className="quiz__share" parentSource="quiz" />
    </Conclusion>
  ) : null;

  const showResultingAction = () => {
    const action = find(fields.results, { id: selectedResult });
    if (action) {
      action.fields.content = `${fields.conclusion}\n${action.fields.content}`;
    }

    return <ContentfulEntry json={action} />;
  };

  if (shouldSeeResult) {
    trackAnalyticsEvent({
      context: { responses: data.questions },
      metadata: {
        category: 'campaign_action',
        noun: 'quiz',
        target: 'form',
        verb: 'submitted',
      },
    });
  }

  return (
    <div className="quiz">
      <div className="quiz__introduction">
        <h1 className="quiz__subtitle">
          {fields.subtitle || LegacyQuiz.defaultProps.fields.subtitle}
        </h1>
        <h2 className="quiz__title">{fields.title}</h2>
        {introduction}
      </div>

      {questions}

      {quizError}

      {submitConclusion}

      {fields.resultActions && selectedResult
        ? showResultingAction()
        : shareConclusion}
    </div>
  );
};

LegacyQuiz.propTypes = {
  id: PropTypes.string.isRequired,
  fields: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    slug: PropTypes.string,
    introduction: PropTypes.string,
    conclusion: PropTypes.string,
    comparison: PropTypes.string,
    callToAction: PropTypes.string,
    questions: PropTypes.array,
  }),
  data: PropTypes.shape({
    shouldSeeResult: PropTypes.bool,
    questions: PropTypes.object,
    error: PropTypes.string,
  }),
  completeQuiz: PropTypes.func.isRequired,
  pickQuizAnswer: PropTypes.func.isRequired,
  submitButtonText: PropTypes.string,
};

LegacyQuiz.defaultProps = {
  data: {
    shouldSeeResult: false,
    questions: {},
    error: null,
  },
  fields: {
    subtitle: 'Quiz',
    introduction: '',
    questions: [],
    conclusion: '',
    comparison: '',
    callToAction: '',
  },
  submitButtonText: 'get results',
};

export default LegacyQuiz;
