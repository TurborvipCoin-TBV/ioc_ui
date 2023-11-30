import { Text, VStack } from '@chakra-ui/react'
import React from 'react'

function DateTimeDisplay({value}:{value:number}) {
  return (
    <VStack>
        <Text fontSize={'16px'}>{value}</Text>
    </VStack>
  )
}

export default DateTimeDisplay