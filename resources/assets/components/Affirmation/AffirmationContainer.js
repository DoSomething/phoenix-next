import { connect } from 'react-redux';

import Affirmation from './Affirmation';
import { getUserId } from '../../selectors/user';

const mapStateToProps = state => ({
  userId: getUserId(state),
});

export default connect(mapStateToProps)(Affirmation);
