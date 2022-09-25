import classNames from 'classnames'
import React from 'react'

const MAIN_CLASSES = classNames(
  'p-2'
)

type Props = {
  groups: {[x:string] : any}[]
  additionalClasses?: string
}

export default function Form({
  groups,
  additionalClasses
} : Props){
  const classes = classNames(
    MAIN_CLASSES, additionalClasses,
    'flex flex-col'
  )
  return (

    <form className={classes}>
      {
        groups.map( (item, i) => <div key={i}
          className='m-3 flex'>
          {item.node as React.ReactNode}
        </div>)
      }
    </form>
  )
}