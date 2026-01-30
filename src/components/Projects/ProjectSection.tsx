'use client'

import { useState } from 'react'
import { Project } from '@/lib/types'
import SectionHeading from '../SectionHeading/SectionHeading'
import ProjectCard from './ProjectCard'

interface ProjectSectionProps {
  projects: Project[]
}

const platforms = ['Web', 'iOS', 'Android'] as const
type Platform = (typeof platforms)[number]

const ProjectSection: React.FC<ProjectSectionProps> = ({ projects }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('Web')

  const filteredProjects = projects.filter(
    (project) => project.platform === selectedPlatform
  )

  return (
    <section id="projects">
      <SectionHeading title="Projects" />

      {/* 🔥 Animated Tabs */}
      <div className="relative mb-8 flex w-fit gap-2 rounded-full bg-neutral-900 p-2">
        {platforms.map((platform) => {
          const isActive = selectedPlatform === platform

          return (
            <button
              key={platform}
              onClick={() => setSelectedPlatform(platform)}
              className={`relative z-10 rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300
                ${
                  isActive
                    ? 'text-white scale-105'
                    : 'text-gray-400 hover:text-white'
                }`}
            >
              {platform}

              {/* Active pill animation */}
              {isActive && (
                <span className="absolute inset-0 -z-10 rounded-full bg-accent transition-all duration-300" />
              )}
            </button>
          )
        })}
      </div>

      {/* Projects */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <ProjectCard key={project.priority} data={project} />
          ))
        ) : (
          <p className="text-neutral col-span-full text-center">
            No projects found for this platform.
          </p>
        )}
      </div>
    </section>
  )
}

export default ProjectSection
