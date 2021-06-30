import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Text } from '@ui-kitten/components'
import moment from 'moment'

export default function ReRenderer({ interval, children }) {
  const [timer, setTimer] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(new Date())
    }, 100)

    console.log('rerender')
    return () => clearInterval(interval)
  }, [])

  function doSomething(value) {
    console.log('doSomething called by child with value:', value)
  }

  const childrenWithProps = React.Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a typescript
    // error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { doSomething })
    }
    return child
  })

  return <View>{childrenWithProps}</View>
}
