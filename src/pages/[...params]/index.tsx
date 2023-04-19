import { useRouter } from 'next/router'
import React from 'react'
import Tests from '../../components/tests'
import RenderCourses from '../../components/render-courses'

type Props = {}

function index({ }: Props) {
    const router = useRouter()
    const params: any = router.query.params || []
    return (
        <div>
            {params[1] === 'tests' && <Tests />}
            {params[1] === 'courses' && <RenderCourses />}
        </div>
    )
}

export default index