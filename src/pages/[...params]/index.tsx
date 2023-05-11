import { useRouter } from 'next/router'
import React from 'react'
import Tests from '../../components/tests'
import RenderCourses from '../../components/render-courses'
import RenderOwnCourses from '../../components/render-own-courses'
import Inquiries from '../inquiries'
import Tasks from '../tasks'
import Earnings from '../Earnings'

type Props = {}

function index({ }: Props) {
    const router = useRouter()
    const params: any = router.query.params || []
    return (
        <div>
            {params[1] === 'tests' && <Tests />}
            {params[1] === 'courses' && <RenderOwnCourses />}
            {params[1] === 'inquiries' && <Inquiries />}
            {params[1] === 'tasks' && <Tasks />}
            {params[1] === 'earnings' && <Earnings />}
        </div>
    )
}

export default index