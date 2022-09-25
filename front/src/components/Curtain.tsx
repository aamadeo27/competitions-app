import classNames from 'classnames'

type CurtainProps = {
  classes?: string
  roundedClass?: string
}

export default function Curtain({ 
  classes,
  roundedClass = 'rounded-3xl'
}: CurtainProps){
  const clazz = classNames(
    'top-0 left-0 w-full h-full z-2 bg-black absolute',
    classes ? classes : 'opacity-30',
    roundedClass
  )
  return <div className={clazz} >
  </div>
}