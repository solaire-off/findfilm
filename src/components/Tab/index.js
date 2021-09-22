import React from 'react'
import PropTypes from 'prop-types'

const Tab = ({ name, isActive }) => {
    const checkTabIsActive = isActive ? 'tabs-list__item--active' : '';
    return (
        <button type="button" class={`tabs-list__item ${checkTabIsActive}`}>{name}</button>
    )
}

Tab.propTypes = {
    name: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
}

export default Tab
