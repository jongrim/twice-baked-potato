import faker from "faker"

export interface Item {
  productName: string
  description: string
}

export interface OrderItem {
  item: Item
  count: number
}

const makeItem = (): Item => ({
  productName: faker.commerce.productName(),
  description: faker.commerce.product()
})

const makeOrderItem = (): OrderItem => ({
  item: makeItem(),
  count: faker.random.number()
})

export function getOrderItems({
  orderId
}: {
  orderId: string
}): Promise<OrderItem[]> {
  console.log(orderId)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let items: OrderItem[] = []
      for (let i = 0; i < 25; i++) {
        items.push(makeOrderItem())
      }
      const r = Math.random()
      if (r > 0.75) {
        reject(new Error("Error"))
      }
      resolve(items)
    }, 2500)
  })
}
