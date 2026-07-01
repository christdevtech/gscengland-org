'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  // Collections
  LayoutTemplate,
  Newspaper,
  CalendarDays,
  Users,
  ImageIcon,
  Tag,
  Mail,
  // Blocks
  Sparkles,
  AlignLeft,
  LayoutPanelLeft,
  Camera,
  GalleryHorizontal,
  Megaphone,
  ImagePlus,
  Heart,
  UserRound,
  CalendarCheck,
  Archive,
  ChevronDown,
  HelpCircle,
  ClipboardList,
  MapPin,
  Space,
  // Quick links
  Home,
  ExternalLink,
  Plus,
  PenLine,
  CalendarPlus,
  Upload,
  UserPlus,
  // Workflow
  FileText,
  MonitorPlay,
  Clock,
  CheckCircle2,
  // UI
  Lightbulb,
  Pin,
  FolderOpen,
  Blocks,
  ChevronRight,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import './index.scss'

// ─── Types ────────────────────────────────────────────────────────────────────

type ColorKey = 'violet' | 'blue' | 'purple' | 'teal' | 'amber' | 'rose' | 'emerald'

interface CollectionDef {
  slug: string
  label: string
  Icon: LucideIcon
  color: ColorKey
  description: string
  href: string
  tip: string
  fields: string[]
}

interface BlockDef {
  slug: string
  label: string
  Icon: LucideIcon
  color: ColorKey
  description: string
}

interface QuickLinkDef {
  label: string
  href: string
  Icon: LucideIcon
  external: boolean
  variant: 'primary' | 'default'
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const collections: CollectionDef[] = [
  {
    slug: 'pages',
    label: 'Pages',
    Icon: LayoutTemplate,
    color: 'violet',
    description: 'Main website pages built with a flexible block system.',
    href: '/admin/collections/pages',
    tip: 'Each page has a Hero section, a Content layout (built from blocks), and SEO settings. Changes auto-save as drafts every 100 ms.',
    fields: ['Title', 'Hero', 'Layout (Blocks)', 'SEO / Meta', 'Slug'],
  },
  {
    slug: 'posts',
    label: 'News & Articles',
    Icon: Newspaper,
    color: 'blue',
    description: 'News articles, sermons and announcements for the congregation.',
    href: '/admin/collections/posts',
    tip: 'Posts support categories, authors and related posts. Rich-text content can embed Banner, Code and Media blocks inline.',
    fields: ['Title', 'Hero Image', 'Content (Rich Text)', 'Categories', 'Authors', 'SEO'],
  },
  {
    slug: 'events',
    label: 'Events',
    Icon: CalendarDays,
    color: 'purple',
    description: 'Church events — single or multi-day, with sessions and galleries.',
    href: '/admin/collections/events',
    tip: 'Toggle "Is Multi-Day" to unlock Start/End date fields. Add multiple sessions, each with its own time and description.',
    fields: ['Title', 'Description', 'Date / Sessions', 'Venue', 'Gallery', 'SEO'],
  },
  {
    slug: 'staff',
    label: 'Staff',
    Icon: Users,
    color: 'teal',
    description: 'Pastoral team, trustees, ministers and department heads.',
    href: '/admin/collections/staff',
    tip: 'Set the "Order" number to control how staff members appear within their category on the website.',
    fields: ['Name', 'Position', 'Category', 'Profile Picture', 'Bio', 'Email / Phone'],
  },
  {
    slug: 'media',
    label: 'Media Library',
    Icon: ImageIcon,
    color: 'amber',
    description: 'Central media library — images used across all content.',
    href: '/admin/collections/media',
    tip: 'Uploaded images are automatically resized into 7 formats (thumbnail → xlarge + og) for optimal performance across devices.',
    fields: ['File Upload', 'Alt Text', 'Caption'],
  },
  {
    slug: 'categories',
    label: 'Categories',
    Icon: Tag,
    color: 'rose',
    description: 'Taxonomy labels used to organise posts.',
    href: '/admin/collections/categories',
    tip: 'Create categories here first, then assign them to posts from the post editor sidebar.',
    fields: ['Title', 'Slug'],
  },
  {
    slug: 'subscribers',
    label: 'Subscribers',
    Icon: Mail,
    color: 'emerald',
    description: 'Email subscribers collected from the website sign-up form.',
    href: '/admin/collections/subscribers',
    tip: 'Subscribers are automatically notified when new posts or events are published. Delete a record to unsubscribe them.',
    fields: ['Email'],
  },
]

const blocks: BlockDef[] = [
  { slug: 'introBlock',      label: 'Intro Block',     Icon: Sparkles,          color: 'violet',  description: 'Full-width intro — subtitle, title, description and optional CTA.' },
  { slug: 'content',         label: 'Content',          Icon: AlignLeft,         color: 'blue',    description: 'Multi-column rich-text for body copy, lists and inline media.' },
  { slug: 'contentImage',    label: 'Content + Image',  Icon: LayoutPanelLeft,   color: 'blue',    description: 'Side-by-side text and image — configurable left or right.' },
  { slug: 'mediaBlock',      label: 'Media',            Icon: Camera,            color: 'amber',   description: 'Full-width image or video with optional caption.' },
  { slug: 'galleryBlock',    label: 'Gallery',          Icon: GalleryHorizontal, color: 'amber',   description: 'Grid or masonry photo gallery from the media library.' },
  { slug: 'cta',             label: 'Call to Action',   Icon: Megaphone,         color: 'rose',    description: 'Prominent CTA banner with heading, body text and buttons.' },
  { slug: 'ctaImage',        label: 'CTA + Image',      Icon: ImagePlus,         color: 'rose',    description: 'Call-to-action section with a background or side image.' },
  { slug: 'serviceBlock',    label: 'Service Block',    Icon: Heart,             color: 'purple',  description: 'Highlight ministry services or programmes in a card grid.' },
  { slug: 'staffBlock',      label: 'Staff Block',      Icon: UserRound,         color: 'teal',    description: 'Pulls staff members from the Staff collection by category.' },
  { slug: 'eventsBlock',     label: 'Events Block',     Icon: CalendarCheck,     color: 'purple',  description: 'Displays upcoming events from the Events collection.' },
  { slug: 'archive',         label: 'Archive',          Icon: Archive,           color: 'blue',    description: 'Auto-populating post list — filter by category or latest.' },
  { slug: 'accordionBlock',  label: 'Accordion / FAQ',  Icon: HelpCircle,        color: 'violet',  description: 'Collapsible Q&A items with optional intro text.' },
  { slug: 'formBlock',       label: 'Form',             Icon: ClipboardList,     color: 'emerald', description: 'Embeds a form built in the Forms plugin (contact / sign-up).' },
  { slug: 'contactBlock',    label: 'Contact',          Icon: MapPin,            color: 'emerald', description: 'Church contact details — address, phone, email and map.' },
  { slug: 'spacer',          label: 'Spacer',           Icon: Space,             color: 'amber',   description: 'Configurable vertical whitespace between sections.' },
]

const quickLinks: QuickLinkDef[] = [
  { label: 'View Site',     href: '/',                                   Icon: Home,       external: true,  variant: 'default'  },
  { label: 'News',          href: '/posts',                              Icon: Newspaper,  external: true,  variant: 'default'  },
  { label: 'Events',        href: '/events',                             Icon: CalendarDays, external: true, variant: 'default' },
  { label: 'New Page',      href: '/admin/collections/pages/create',     Icon: Plus,       external: false, variant: 'primary'  },
  { label: 'New Post',      href: '/admin/collections/posts/create',     Icon: PenLine,    external: false, variant: 'primary'  },
  { label: 'New Event',     href: '/admin/collections/events/create',    Icon: CalendarPlus, external: false, variant: 'primary' },
  { label: 'Upload Media',  href: '/admin/collections/media/create',     Icon: Upload,     external: false, variant: 'default'  },
  { label: 'Add Staff',     href: '/admin/collections/staff/create',     Icon: UserPlus,   external: false, variant: 'default'  },
]

const workflowSteps = [
  { Icon: FileText,     label: 'Draft',     desc: 'Create content — auto-saved as a draft every 100 ms.',        color: 'violet'  },
  { Icon: MonitorPlay,  label: 'Preview',   desc: 'Use Live Preview to see your changes in real time.',           color: 'blue'    },
  { Icon: Clock,        label: 'Schedule',  desc: 'Set a future publish date or publish immediately.',            color: 'amber'   },
  { Icon: CheckCircle2, label: 'Published', desc: 'Content goes live and the site automatically revalidates.',    color: 'emerald' },
]

// ─── Color config ─────────────────────────────────────────────────────────────

const colorCfg: Record<ColorKey, { accent: string; bg: string; text: string; border: string; tagBg: string; tagText: string }> = {
  violet:  { accent: '#7c3aed', bg: 'rgba(124,58,237,0.1)',  text: '#7c3aed', border: 'rgba(124,58,237,0.25)', tagBg: 'rgba(124,58,237,0.1)',  tagText: '#7c3aed' },
  blue:    { accent: '#2563eb', bg: 'rgba(37,99,235,0.1)',   text: '#2563eb', border: 'rgba(37,99,235,0.25)',  tagBg: 'rgba(37,99,235,0.1)',   tagText: '#2563eb' },
  purple:  { accent: '#9333ea', bg: 'rgba(147,51,234,0.1)',  text: '#9333ea', border: 'rgba(147,51,234,0.25)', tagBg: 'rgba(147,51,234,0.1)',  tagText: '#9333ea' },
  teal:    { accent: '#0d9488', bg: 'rgba(13,148,136,0.1)',  text: '#0d9488', border: 'rgba(13,148,136,0.25)', tagBg: 'rgba(13,148,136,0.1)',  tagText: '#0d9488' },
  amber:   { accent: '#d97706', bg: 'rgba(217,119,6,0.1)',   text: '#d97706', border: 'rgba(217,119,6,0.25)',  tagBg: 'rgba(217,119,6,0.1)',   tagText: '#b45309' },
  rose:    { accent: '#e11d48', bg: 'rgba(225,29,72,0.1)',   text: '#e11d48', border: 'rgba(225,29,72,0.25)',  tagBg: 'rgba(225,29,72,0.1)',   tagText: '#e11d48' },
  emerald: { accent: '#059669', bg: 'rgba(5,150,105,0.1)',   text: '#059669', border: 'rgba(5,150,105,0.25)', tagBg: 'rgba(5,150,105,0.1)',   tagText: '#059669' },
}

// ─── Sub-components ────────────────────────────────────────────────────────────

const CollectionCard: React.FC<{
  item: CollectionDef
  isOpen: boolean
  onToggle: () => void
}> = ({ item, isOpen, onToggle }) => {
  const c = colorCfg[item.color]
  const { Icon } = item

  return (
    <div
      className={`bd-card ${isOpen ? 'bd-card--open' : ''}`}
      style={{ '--card-accent': c.accent, '--card-border': c.border } as React.CSSProperties}
    >
      <button className="bd-card__header" onClick={onToggle} aria-expanded={isOpen}>
        <span className="bd-card__icon-wrap" style={{ background: c.bg, color: c.accent }}>
          <Icon size={16} strokeWidth={2} />
        </span>
        <span className="bd-card__title">{item.label}</span>
        <span className="bd-card__desc">{item.description}</span>
        <ChevronDown
          className={`bd-card__chevron ${isOpen ? 'bd-card__chevron--open' : ''}`}
          size={16}
          strokeWidth={2.5}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div className="bd-card__body">
          <div className="bd-card__tip" style={{ background: c.bg, borderColor: c.border }}>
            <Lightbulb size={14} strokeWidth={2} style={{ color: c.accent, flexShrink: 0, marginTop: 1 }} />
            <span>{item.tip}</span>
          </div>
          <p className="bd-card__fields-label">Available fields</p>
          <div className="bd-card__tags">
            {item.fields.map((f) => (
              <span
                key={f}
                className="bd-tag"
                style={{ background: c.tagBg, color: c.tagText }}
              >
                {f}
              </span>
            ))}
          </div>
          <Link href={item.href} className="bd-card__link" style={{ color: c.accent }}>
            Open {item.label}
            <ChevronRight size={14} strokeWidth={2.5} />
          </Link>
        </div>
      )}
    </div>
  )
}

const BlockCard: React.FC<{ item: BlockDef }> = ({ item }) => {
  const c = colorCfg[item.color]
  const { Icon } = item
  return (
    <div
      className="bd-block-card"
      style={{ '--block-accent': c.accent, '--block-border': c.border } as React.CSSProperties}
    >
      <span className="bd-block-card__icon" style={{ background: c.bg, color: c.accent }}>
        <Icon size={16} strokeWidth={2} />
      </span>
      <div className="bd-block-card__body">
        <span className="bd-block-card__name">{item.label}</span>
        <span className="bd-block-card__desc">{item.description}</span>
      </div>
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────

const BeforeDashboard: React.FC = () => {
  const [openCollection, setOpenCollection] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'collections' | 'blocks'>('collections')

  const toggle = (slug: string) => setOpenCollection((prev) => (prev === slug ? null : slug))

  return (
    <div className="bd-root">

      {/* ── Hero ── */}
      <div className="bd-hero">
        <div className="bd-hero__orb bd-hero__orb--1" aria-hidden="true" />
        <div className="bd-hero__orb bd-hero__orb--2" aria-hidden="true" />
        <div className="bd-hero__inner">
          <div className="bd-hero__text">
            <div className="bd-hero__eyebrow">
              <span className="bd-hero__dot" />
              Gateway Salvation Church · Admin
            </div>
            <h1 className="bd-hero__title">
              Welcome back 👋
            </h1>
            <p className="bd-hero__subtitle">
              Manage pages, posts, events, staff and more — all from one place.
            </p>
          </div>
          <div className="bd-hero__graphic" aria-hidden="true">
            <div className="bd-hero__ring bd-hero__ring--outer" />
            <div className="bd-hero__ring bd-hero__ring--inner" />
            <LayoutTemplate size={40} strokeWidth={1.5} className="bd-hero__icon" />
          </div>
        </div>
      </div>

      {/* ── Quick Actions ── */}
      <section className="bd-section">
        <h2 className="bd-section__label">Quick Actions</h2>
        <div className="bd-actions">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className={`bd-action bd-action--${link.variant}`}
            >
              <link.Icon size={15} strokeWidth={2} className="bd-action__icon" />
              <span>{link.label}</span>
              {link.external && <ExternalLink size={12} strokeWidth={2} className="bd-action__ext" />}
            </Link>
          ))}
        </div>
      </section>

      {/* ── Content Guide ── */}
      <section className="bd-section">
        <div className="bd-guide-top">
          <div>
            <h2 className="bd-section__label">Content Guide</h2>
            <p className="bd-guide-desc">
              Learn how the different content types work together to build the GSC England website.
            </p>
          </div>
          <div className="bd-tabs" role="tablist">
            <button
              role="tab"
              aria-selected={activeTab === 'collections'}
              className={`bd-tab ${activeTab === 'collections' ? 'bd-tab--active' : ''}`}
              onClick={() => setActiveTab('collections')}
            >
              <FolderOpen size={14} strokeWidth={2} />
              Collections
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'blocks'}
              className={`bd-tab ${activeTab === 'blocks' ? 'bd-tab--active' : ''}`}
              onClick={() => setActiveTab('blocks')}
            >
              <Blocks size={14} strokeWidth={2} />
              Page Blocks
            </button>
          </div>
        </div>

        {activeTab === 'collections' && (
          <div className="bd-panel" role="tabpanel">
            <p className="bd-panel__hint">
              Expand a collection to see its fields, tips and a direct link.
            </p>
            <div className="bd-collections">
              {collections.map((item) => (
                <CollectionCard
                  key={item.slug}
                  item={item}
                  isOpen={openCollection === item.slug}
                  onToggle={() => toggle(item.slug)}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'blocks' && (
          <div className="bd-panel" role="tabpanel">
            <p className="bd-panel__hint">
              Pages are built by stacking blocks inside the <strong>Content</strong> tab of the
              page editor. All blocks can be freely added and reordered.
            </p>
            <div className="bd-blocks-grid">
              {blocks.map((block) => (
                <BlockCard key={block.slug} item={block} />
              ))}
            </div>
            <div className="bd-inline-note">
              <Pin size={13} strokeWidth={2} className="bd-inline-note__icon" />
              <span>
                Posts &amp; Events also support inline blocks directly inside their rich-text
                editor: <strong>Banner</strong>, <strong>Code</strong> and <strong>Media</strong>.
              </span>
            </div>
          </div>
        )}
      </section>

      {/* ── Workflow ── */}
      <section className="bd-workflow">
        <h2 className="bd-section__label bd-workflow__heading">Publishing Workflow</h2>
        <div className="bd-workflow__track">
          {workflowSteps.map(({ Icon: StepIcon, label, desc, color }, i) => {
            const c = colorCfg[color as ColorKey]
            return (
              <React.Fragment key={label}>
                <div className="bd-wf-step">
                  <div className="bd-wf-step__bubble" style={{ background: c.bg, color: c.accent, borderColor: c.border }}>
                    <StepIcon size={18} strokeWidth={2} />
                  </div>
                  <div className="bd-wf-step__num" style={{ color: c.accent }}>{i + 1}</div>
                  <strong className="bd-wf-step__label">{label}</strong>
                  <p className="bd-wf-step__desc">{desc}</p>
                </div>
                {i < workflowSteps.length - 1 && (
                  <div className="bd-wf-connector" aria-hidden="true">
                    <ChevronRight size={16} strokeWidth={2} />
                  </div>
                )}
              </React.Fragment>
            )
          })}
        </div>
      </section>

    </div>
  )
}

export default BeforeDashboard
