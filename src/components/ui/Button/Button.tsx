import s from './Button.module.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Button = ({ className, children, styled, ...props }) => {
  return (
    <button
      {...props}
      className={classNames(
        s.button,
        {
          [s.primary]: styled === 'primary',
          [s.secondary]: styled === 'secondary',
        },
        className
      )}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  styled: PropTypes.string,
};

Button.defaultProps = {
  styled: 'primary',
};

export default Button;
