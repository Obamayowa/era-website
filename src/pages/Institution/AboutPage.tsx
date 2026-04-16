import { motion } from 'framer-motion'
import {
  Award, Shield, CheckCircle, Recycle, Users, TrendingUp, Globe,
  Palette, BookOpen, FlaskConical, ShoppingBag, GraduationCap, Settings,
  Link as LinkIcon, Quote
} from 'lucide-react'
import { SectionHeading } from '@/components/institution/SectionHeading'
import { useCountUp } from '@/components/institution/useCountUp'

const OBA_PORTRAIT = 'https://static.prod-images.emergentagent.com/jobs/0abb3382-c7dc-49d3-9a90-e40de9d6fe8b/images/6054d46beea8d7ca23702e1ad9bef0986fba53d1c67199a484fb54b04cea0b57.jpeg'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5 },
}

const stagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
}

/* ── Impact Metric ─────────────────────────── */
function ImpactMetric({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const { count, ref } = useCountUp(value, 2200)
  return (
    <motion.div
      ref={ref}
      {...stagger}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
      <span className="block font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-accent">
        {count.toLocaleString()}{suffix}
      </span>
      <span className="mt-2 block text-sm text-offwhite/70 uppercase tracking-wider">{label}</span>
    </motion.div>
  )
}

/* ── Certification Card ───────────────────── */
function CertCard({ level, name, icon: Icon, features, color }: {
  level: number; name: string; icon: React.ElementType; features: string[]; color: string
}) {
  return (
    <motion.div
      {...stagger}
      transition={{ duration: 0.5, delay: level * 0.15 }}
      className="relative rounded-2xl border border-stone/10 bg-offwhite p-8 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${color}`}>
        <Icon size={14} />
        Level {level}
      </div>
      <h3 className="mt-4 font-heading text-2xl font-bold text-primary">{name}</h3>
      <ul className="mt-5 space-y-3">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-stone/80">
            <CheckCircle size={16} className="mt-0.5 shrink-0 text-accent" />
            {f}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

/* ── Division Card ─────────────────────── */
function DivisionCard({ icon: Icon, name, desc, delay }: {
  icon: React.ElementType; name: string; desc: string; delay: number
}) {
  return (
    <motion.div
      {...stagger}
      transition={{ duration: 0.4, delay }}
      className="group rounded-xl border border-stone/10 bg-offwhite p-6 hover:border-accent/30 hover:shadow-md transition-all"
    >
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 text-primary group-hover:bg-accent/10 group-hover:text-accent transition-colors">
        <Icon size={22} />
      </div>
      <h3 className="font-heading text-lg font-semibold text-primary">{name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-stone/70">{desc}</p>
    </motion.div>
  )
}

/* ═════════════════════════
   ABOUT PAGE
   ═════════════════════════ */
export function AboutPage() {
  return (
    <main>
      {/* ── Editorial Hero ────────────────────── */}
      <section className="relative overflow-hidden bg-primary pt-32 pb-24 lg:pt-40 lg:pb-32" aria-label="About hero">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, var(--color-accent) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, var(--color-accent) 0%, transparent 40%)`
        }} />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-accent mb-6"
          >
            About ERA
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-offwhite leading-[1.1] text-balance"
          >
            Establishing the Foundation for{' '}
            <span className="text-accent">Sustainable Artistic Excellence</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 max-w-2xl mx-auto text-lg text-offwhite/70 leading-relaxed"
          >
            Everything Recycled Arts is a cultural institution, marketplace, and certification body 
            dedicated to transforming waste materials into authenticated works of art.
          </motion.p>
        </div>
      </section>

      {/* ── Founder Story ──────╌─────────── */}
      <section className="py-20 lg:py-28" aria-label="Founder story">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div {...fadeUp} className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={OBA_PORTRAIT}
                  alt="Oba, Founder & Artistic Director of Everything Recycled Arts"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute -bottom-6 -right-4 lg:right-8 max-w-xs bg-primary text-offwhite rounded-xl p-6 shadow-lg"
              >
                <Quote size={20} className="text-accent mb-2" />
                <p className="text-sm italic leading-relaxed">
                  "Every discarded material carries a story waiting to be told through art. Our mission is to give that story a stage."
                </p>
              </motion.div>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.15 }}>
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">
                Founder & Artistic Director
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-primary">
                Oba
              </h2>
              <div className="mt-6 space-y-4 text-stone/80 leading-relaxed">
                <p>
                  Oba founded Everything Recycled Arts with a singular vision: to establish a world-class 
                  institution that elevates recycled art from craft curiosity to certified fine art.
                </p>
                <p>
                  Drawing from years of experience at the intersection of sustainability, technology, and 
                  the visual arts, Oba envisioned an ecosystem where waste materials are not just repurposed 
                  but transformed—given provenance, authenticity, and cultural value through a rigorous 
                  certification framework.
                </p>
                <p>
                  Under Oba's leadership, ERA has grown into a multi-disciplinary platform spanning digital 
                  authentication, artist residencies, corporate sustainability programs, and a global 
                  marketplace for certified recycled artworks.
                </p>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-8 flex flex-wrap gap-4"
              >
                {['Sustainability Pioneer', 'Art & Technology', 'Circular Economy'].map((tag) => (
                  <span key={tag} className="rounded-full bg-primary/5 px-4 py-2 text-xs font-medium text-primary">
                    {tag}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Certification System ──────────────────── */}
      <section className="py-20 lg:py-28 bg-sand/50" aria-label="Certification system">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Certification Framework"
            title="Three Tiers of Artistic Integrity"
            subtitle="Our proprietary certification system ensures authenticity, material provenance, and artistic quality at every level."
          />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
            <CertCard
              level={1}
              name="Participating"
              icon={Recycle}
              color="bg-accent/10 text-accent"
              features={[
                'Artist profile on ERA platform',
                'Basic material sourcing verification',
                'Community access & workshops',
                'Marketplace listing eligibility',
              ]}
            />
            <CertCard
              level={2}
              name="Verified"
              icon={Shield}
              color="bg-gold/10 text-gold"
              features={[
                'Full material chain-of-custody audit',
                'Professional portfolio review',
                'Verified badge on all listings',
                'Priority exhibition placement',
                'Access to corporate commissions',
              ]}
            />
            <CertCard
              level={3}
              name="Certified"
              icon={Award}
              color="bg-amber/10 text-amber"
              features={[
                'Blockchain-anchored provenance NFT',
                'ERA Master Certification seal',
                'Featured artist status',
                'Residency program eligibility',
                'Institutional acquisition network',
                'Annual exhibition inclusion',
              ]}
            />
          </div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 mx-auto max-w-2xl rounded-xl border border-accent/20 bg-primary/5 p-6 flex items-start gap-4"
          >
            <LinkIcon size={20} className="mt-1 shrink-0 text-accent" />
            <div>
              <h4 className="font-heading text-sm font-semibold text-primary">Blockchain-Anchored Provenance</h4>
              <p className="mt-1 text-sm text-stone/70 leading-relaxed">
                Level 3 certified artworks receive a unique provenance NFT that records material origin, 
                artist identity, certification status, and ownership history on an immutable ledger—ensuring 
                transparent authenticity for collectors worldwide.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Impact Metrics ────────────────────── */}
      <section className="py-20 lg:py-28 bg-primary" aria-label="Impact metrics">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Our Impact"
            title="Numbers That Matter"
            light
          />
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-10">
            <ImpactMetric value={12500} suffix="+" label="Tons Waste Diverted" delay={0} />
            <ImpactMetric value={840} suffix="" label="Artists Empowered" delay={0.1} />
            <ImpactMetric value={3200} suffix="+" label="Artworks Certified" delay={0.2} />
            <ImpactMetric value={47} suffix="" label="Countries Reached" delay={0.3} />
          </div>
        </div>
      </section>

      {/* ── Organizational Structure ──────────────── */}
      <section className="py-20 lg:py-28" aria-label="Organizational structure">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Our Organization"
            title="Six Divisions, One Mission"
            subtitle="ERA operates as a multi-disciplinary institution with specialized divisions working in concert."
          />
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <DivisionCard
              icon={Palette}
              name="Digital"
              desc="Platform engineering, blockchain integration, NFT minting infrastructure, and digital experience design."
              delay={0}
            />
            <DivisionCard
              icon={Globe}
              name="Cultural"
              desc="Exhibitions, curatorial programs, museum partnerships, and cultural exchange initiatives worldwide."
              delay={0.08}
            />
            <DivisionCard
              icon={FlaskConical}
              name="Research"
              desc="Material science innovation, sustainability metrics, environmental impact assessment, and academic partnerships."
              delay={0.16}
            />
            <DivisionCard
              icon={ShoppingBag}
              name="Marketplace"
              desc="E-commerce operations, auction management, commission facilitation, and collector relations."
              delay={0.24}
            />
            <DivisionCard
              icon={GraduationCap}
              name="Education"
              desc="Workshop programming, online curricula, school partnerships, artist residencies, and certification training."
              delay={0.32}
            />
            <DivisionCard
              icon={Settings}
              name="Operations"
              desc="Material logistics, waste partner coordination, quality assurance, and organizational management."
              delay={0.40}
            />
          </div>
        </div>
      </section>
    </main>
  )
}
