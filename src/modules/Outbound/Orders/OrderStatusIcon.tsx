import React from "react"
import {
  faBox,
  faCheckCircle,
  faShippingFast,
  faFileAlt,
  IconDefinition
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { OrderStatus } from "../../../data/Orders"

function getIcon(status: OrderStatus): IconDefinition {
  switch (status) {
    case "CREATED":
      return faFileAlt
    case "APPROVED":
      return faCheckCircle
    case "PICKED":
      return faBox
    case "SHIPPED":
      return faShippingFast
    default:
      return faFileAlt
  }
}

function OrderStatusIcon({ status }: { status: OrderStatus }) {
  return <FontAwesomeIcon icon={getIcon(status)} />
}

export default OrderStatusIcon
