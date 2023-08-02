import React from 'react'
import { Link } from 'react-router-dom'

function MemberComp(props) {
    const member = props.member
  return (
    <div>
        <p>
            <Link to={`/member-service/detail/${member.username}`}>
                {member.username}
            </Link>
        </p>
    </div>
  )
}

export default MemberComp