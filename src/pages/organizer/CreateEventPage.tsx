import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useCreateEvent } from '../../features/event/event.hooks';
import { GlassCard } from '../../components/ui/glass-card';
import { Button } from '../../components/ui/button';

const createEventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  category: z.string().min(1, 'Please select a category'),
  tags: z.string().optional(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  venueId: z.string().optional(),
});

type CreateEventForm = z.infer<typeof createEventSchema>;

export default function CreateEventPage() {
  const navigate = useNavigate();
  const { mutate: createEvent, isPending, error } = useCreateEvent();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateEventForm>({
    resolver: zodResolver(createEventSchema),
  });

  const onSubmit = (data: CreateEventForm) => {
    createEvent(
      {
        title: data.title,
        description: data.description,
        category: data.category,
        tags: data.tags ? data.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
        startDate: new Date(data.startDate).toISOString(),
        endDate: new Date(data.endDate).toISOString(),
        venueId: data.venueId ?? '',
      },
      {
        onSuccess: (created) => {
          navigate(`/organizer/events`);
        },
      }
    );
  };

  return (
    <div className="max-w-[1000px] mx-auto w-full flex-1 pb-24 md:pb-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-2">Create New Event</h2>
          <p className="text-sm text-muted-foreground">Setup details, venue, and ticketing for your new event.</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <Button
            type="button"
            variant="outline"
            className="flex-1 md:flex-none border-border bg-card hover:bg-card/80 text-foreground"
            onClick={() => navigate('/organizer/events')}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="create-event-form"
            className="flex-1 md:flex-none bg-primary text-primary-foreground hover:bg-primary/90 glow-effect"
            disabled={isPending}
          >
            {isPending ? (
              <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
            ) : null}
            Publish Event
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-sm">
          {(error as { response?: { data?: { message?: string } } })?.response?.data?.message ?? 'Failed to create event. Please try again.'}
        </div>
      )}

      <form id="create-event-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <GlassCard className="p-6 rounded-xl space-y-6">
              <h3 className="font-heading font-semibold text-xl text-foreground border-b border-border pb-4">Basic Information</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Event Name</label>
                  <input
                    {...register('title')}
                    type="text"
                    placeholder="e.g., Neon Nights Festival"
                    className="w-full bg-card/50 border border-border rounded-lg px-4 py-2.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                  {errors.title && <p className="text-destructive text-xs mt-1">{errors.title.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Event Description</label>
                  <textarea
                    {...register('description')}
                    rows={5}
                    placeholder="Describe what makes your event special..."
                    className="w-full bg-card/50 border border-border rounded-lg px-4 py-2.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                  />
                  {errors.description && <p className="text-destructive text-xs mt-1">{errors.description.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Category</label>
                    <select
                      {...register('category')}
                      className="w-full bg-card/50 border border-border rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none"
                    >
                      <option value="">Select Category</option>
                      <option value="music">Music & Concerts</option>
                      <option value="tech">Tech & Innovation</option>
                      <option value="art">Art & Exhibitions</option>
                      <option value="sports">Sports & Fitness</option>
                    </select>
                    {errors.category && <p className="text-destructive text-xs mt-1">{errors.category.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Tags</label>
                    <input
                      {...register('tags')}
                      type="text"
                      placeholder="e.g., EDM, Outdoor, 18+"
                      className="w-full bg-card/50 border border-border rounded-lg px-4 py-2.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Separate with commas</p>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Date & Location */}
            <GlassCard className="p-6 rounded-xl space-y-6">
              <h3 className="font-heading font-semibold text-xl text-foreground border-b border-border pb-4">Date & Location</h3>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Start Date & Time</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">calendar_today</span>
                      <input
                        {...register('startDate')}
                        type="datetime-local"
                        className="w-full bg-card/50 border border-border rounded-lg pl-9 pr-4 py-2.5 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      />
                    </div>
                    {errors.startDate && <p className="text-destructive text-xs mt-1">{errors.startDate.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">End Date & Time</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">calendar_today</span>
                      <input
                        {...register('endDate')}
                        type="datetime-local"
                        className="w-full bg-card/50 border border-border rounded-lg pl-9 pr-4 py-2.5 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      />
                    </div>
                    {errors.endDate && <p className="text-destructive text-xs mt-1">{errors.endDate.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">Venue</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">location_on</span>
                    <input
                      {...register('venueId')}
                      type="text"
                      placeholder="Search for a venue or enter address"
                      className="w-full bg-card/50 border border-border rounded-lg pl-9 pr-4 py-2.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    />
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Cover Image */}
            <GlassCard className="p-6 rounded-xl space-y-4">
              <h3 className="font-heading font-semibold text-xl text-foreground">Cover Image</h3>
              <div className="w-full aspect-video rounded-lg border-2 border-dashed border-border bg-card/30 flex flex-col items-center justify-center gap-2 hover:bg-card/50 hover:border-primary/50 transition-colors cursor-pointer group">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <span className="material-symbols-outlined">add_photo_alternate</span>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">Click to upload</p>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB</p>
                </div>
              </div>
            </GlassCard>

            {/* Ticketing Options */}
            <GlassCard className="p-6 rounded-xl space-y-4">
              <h3 className="font-heading font-semibold text-xl text-foreground">Ticketing</h3>

              <div className="space-y-3">
                <label className="flex items-start gap-3 p-3 rounded-lg border border-border bg-card/50 cursor-pointer hover:border-primary/50 transition-colors">
                  <input type="radio" name="ticket_type" className="mt-1 text-primary focus:ring-primary bg-transparent border-muted-foreground" defaultChecked />
                  <div>
                    <p className="text-sm font-medium text-foreground">General Admission</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Standard ticket pricing without specific seat assignments.</p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-lg border border-border bg-card/50 cursor-pointer hover:border-primary/50 transition-colors">
                  <input type="radio" name="ticket_type" className="mt-1 text-primary focus:ring-primary bg-transparent border-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Seated Event</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Use the Seat Layout Builder to assign specific seats and tiers.</p>
                  </div>
                </label>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full border-dashed border-border hover:border-primary/50 hover:bg-card text-muted-foreground hover:text-foreground"
              >
                <span className="material-symbols-outlined text-sm mr-2">add</span>
                Add Ticket Tier
              </Button>
            </GlassCard>
          </div>
        </div>
      </form>
    </div>
  );
}
