import PropTypes from 'prop-types';

export const User = PropTypes.shape({
    from: PropTypes.string,
    to: PropTypes.string
});

export const MessageDetail = PropTypes.shape({
    message: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired
})