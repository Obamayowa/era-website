import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, CheckCircle, Users, Loader2 } from 'lucide-react'
import { useNewsletterStore } from '@/stores/useNewsletterStore'
import { useScrollReveal } from '@/hooks/useScrollAnimation'

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

type FormData = z.infer<typeof schema>

interface NewsletterData {
  newsletterBadge?: string
  newsletterHeadline?: string
  newsletterSubtext?: string
  newsletterButtonLabel?: string
  newsletterSuccessHeadline?: string
  newsletterSuccessText?: string
  newsletterSubscriberLabel?: string
}

interface Props {
  data?: NewsletterData | null
}

export function NewsletterSignup({ data }: Props) {
  const { status, subscriberCount, subscribe, reset } = useNewsletterStore()
  const { ref, opacity, y } = useScrollReveal()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (formData: FormData) => {
    await subscribe(formData.email)
    resetForm()
  }

  const badge = data?.newsletterBadge || 'Stay Connected'
  const headline = data?.newsletterHeadline || 'Join the Movement'
  const subtext = data?.newsletterSubtext || 'Get early access to new artworks, artist stories, and behind-the-scenes of the recycled art revolution.'
  const buttonLabel = data?.newsletterButtonLabel || 'Join ERA'
  const successHeadline = data?.newsletterSuccessHeadline || 'Welcome to ERA!'
  const successText = data?.newsletterSuccessText || "You're now part of a community transforming waste into wonder."
  const subscriberLabel = data?.newsletterSubscriberLabel || 'art lovers already joined'

  return (
    <section
      id="newsletter"
      className="py-20 lg:py-28 bg-offwhite relative overflow-hidden"
      aria-labelledby="newsletter-heading"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          style={{ opacity, y }}
          className="text-center"
        >
          <span className="inline-block text-sm font-semibold uppercase tracking-widest text-accent mb-3">
            {badge}
          </span>
          <h2
            id="newsletter-heading"
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4 text-balance"
          >
            {headline}
          </h2>
          <p className="text-lg text-stone/60 max-w-xl mx-auto mb-10">
            {subtext}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-4">
                <CheckCircle size={32} />
              </div>
              <h3 className="font-heading text-2xl font-bold text-primary mb-2">
                {successHeadline}
              </h3>
              <p className="text-stone/60 mb-6">
                {successText}
              </p>
              <button
                onClick={reset}
                className="text-sm text-accent hover:text-primary transition-colors"
              >
                Subscribe another email
              </button>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
              noValidate
            >
              <div className="flex-1">
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  {...register('email')}
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-full border border-primary/15 bg-white px-6 py-3.5 text-sm text-stone placeholder:text-stone/40 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  disabled={status === 'loading'}
                />
                {errors.email && (
                  <p id="email-error" className="mt-2 text-xs text-red-500 pl-6" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-offwhite transition-all hover:bg-primary-light hover:scale-105 hover:shadow-lg hover:shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Joining...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    {buttonLabel}
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-stone/50"
        >
          <div className="flex items-center gap-2">
            <Users size={16} className="text-accent" />
            <span>
              <strong className="text-stone/80">{subscriberCount.toLocaleString()}</strong> {subscriberLabel}
            </span>
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-stone/20" />
          <div className="flex -space-x-2">
            {[
              'bg-accent',
              'bg-gold',
              'bg-primary-light',
              'bg-amber',
              'bg-earth',
            ].map((color, i) => (
              <div
                key={i}
                className={`w-7 h-7 rounded-full ${color} border-2 border-offwhite flex items-center justify-center text-[10px] text-offwhite font-bold`}
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
            <div className="w-7 h-7 rounded-full bg-stone/20 border-2 border-offwhite flex items-center justify-center text-[9px] text-stone/60 font-medium">
              +2k
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
