import orders from "./ordersData"
const POSTMAN_API = "https://6d50f0ca-8900-4ece-a4d6-f5bb380385a8.mock.pstmn.io"

export function getOrders() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const r = Math.random()
      if (r < 0.5) {
        resolve(orders)
      } else {
        reject(new Error("ERROR"))
      }
    }, 3000)
  })
  // return fetch(`${POSTMAN_API}/getOrders`, {
  //   method: "GET",
  //   headers: {
  //     "x-api-key": process.env.REACT_APP_POSTMAN_API_KEY
  //   } as HeadersInit
  // }).then(resp => resp.json())
}
