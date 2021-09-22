import React from 'react'
import PropTypes from 'prop-types'
import Tab from '../Tab'

import './Tabs.sass'

const Tabs = ({ list }) => {
    return (
        <div className="tabs-list">
            {list.map((item, index) => <Tab name={item.name} isActive={item.isActive} />)}
        </div>
    )
}

Tabs.propTypes = {
    list: PropTypes.array.isRequired
}

export default Tabs
