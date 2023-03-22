type Props = { className: string }
export default function TwitchIcon({ className }: Props) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M2.74578 1.19995L1.6001 4.25736V16.4855H5.79898V18.7797H8.09133L10.3815 16.4855H13.8176L18.4001 11.9014V1.19995H2.74578ZM4.27215 2.72767H16.873V11.1355L14.1995 13.8111H10.0001L7.71064 16.1022V13.8111H4.27215V2.72767ZM8.47268 10.3722H10.0001V5.78672H8.47268V10.3722ZM12.6725 10.3722H14.1996V5.78672H12.6725V10.3722Z"
        fill="#5A3E85"
      />
    </svg>
  )
}
