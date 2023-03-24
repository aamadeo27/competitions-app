import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import type { ReactNode } from 'react'
import { useState } from 'react'
import Container from '../../components/Container'
import Header from '../../components/Header'
import Competitions from './Competitions'

function Section({ children, title }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const Icon = !open ? ChevronRightIcon : ChevronDownIcon
  return (
    <div className="rounded-2xl bg-gray-900 text-gray-300 p-4">
      <div
        className="relative text-lg font-semibold cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <Icon className="absolute right-5 h-6 w-6 stroke-2" />
        {title}
      </div>
      {open && children}
    </div>
  )
}

export default function ConfigurationsPage() {
  return (
    <div className="mt-28">
      <Header>Configurations</Header>
      <Container>
        <div className="flex flex-col gap-4">
          <Section title="Users">placeholder</Section>
          <Section title="Competitions">
            <Competitions />
          </Section>
          <Section title="Challenges">placeholder</Section>
          <Section title="Matches">placeholder</Section>
        </div>
      </Container>
    </div>
  )
}
