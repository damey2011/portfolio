import type { ComponentType } from 'react';
import {
  User,
  Sparkles,
  Hammer,
  Briefcase,
  GraduationCap,
  Mail,
  FileText,
  Github,
  Linkedin,
  Twitter,
  type LucideIcon,
} from 'lucide-react';
import type { AppId } from '../../stores/useOS';
import AboutApp from '../../apps/AboutApp';
import SkillsApp from '../../apps/SkillsApp';
import ProjectsApp from '../../apps/ProjectsApp';
import ExperienceApp from '../../apps/ExperienceApp';
import EducationApp from '../../apps/EducationApp';
import ContactApp from '../../apps/ContactApp';
import ResumeApp from '../../apps/ResumeApp';

export type AppDef = {
  id: AppId;
  title: string;
  icon: LucideIcon;
  iconColor: string;
  Component: ComponentType;
};

export const APPS: Record<AppId, AppDef> = {
  about: { id: 'about', title: 'About', icon: User, iconColor: '#34c759', Component: AboutApp },
  skills: { id: 'skills', title: 'Skills', icon: Sparkles, iconColor: '#5e5ce6', Component: SkillsApp },
  projects: { id: 'projects', title: 'Currently Building', icon: Hammer, iconColor: '#ff9500', Component: ProjectsApp },
  experience: { id: 'experience', title: 'Experience', icon: Briefcase, iconColor: '#0a84ff', Component: ExperienceApp },
  education: { id: 'education', title: 'Education', icon: GraduationCap, iconColor: '#ff375f', Component: EducationApp },
  contact: { id: 'contact', title: 'Contact', icon: Mail, iconColor: '#30d158', Component: ContactApp },
  resume: { id: 'resume', title: 'Résumé', icon: FileText, iconColor: '#bf5af2', Component: ResumeApp },
};

export const APP_ORDER: AppId[] = ['about', 'skills', 'projects', 'experience', 'education', 'contact', 'resume'];

export type ExternalLink = {
  id: string;
  title: string;
  href: string;
  icon: LucideIcon;
  iconColor: string;
};

export const EXTERNAL_LINKS: ExternalLink[] = [
  { id: 'github', title: 'GitHub', href: 'https://github.com/damey2011', icon: Github, iconColor: '#f5f5f7' },
  { id: 'linkedin', title: 'LinkedIn', href: 'https://linkedin.com/in/nifemi', icon: Linkedin, iconColor: '#0a66c2' },
  { id: 'twitter', title: 'Twitter', href: 'https://twitter.com/theoluwanifemi', icon: Twitter, iconColor: '#1d9bf0' },
];
