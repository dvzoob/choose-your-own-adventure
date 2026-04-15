import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from '../services/hooks'
import ErrorMessage from './ErrorMessage'

export default function AuthorForm() {
  const navigate = useNavigate()
  const [apiError, setApiError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const handleFormSubmit = async (values) => {
    setApiError(null)
    // Validate form
    const newErrors = {}
    if (!values.title?.trim()) newErrors.title = 'Story title is required'
    if (!values.author?.trim()) newErrors.author = 'Author name is required'
    if (!values.content?.trim()) newErrors.content = 'Story content is required'

    if (Object.keys(newErrors).length > 0) {
      Object.keys(newErrors).forEach(key => {
        formState.setErrors(prev => ({ ...prev, [key]: newErrors[key] }))
      })
      return
    }

    try {
      // TODO: Replace with real API call
      // const response = await storiesAPI.create(values)
      
      // Mock success
      setSuccessMessage('Story created successfully!')
      formState.resetForm()
      setTimeout(() => {
        navigate(`/read/story-${Date.now()}`)
      }, 1000)
    } catch (error) {
      setApiError(error.message || 'Failed to create story. Please try again.')
    }
  }

  const formState = useForm(
    { title: '', author: '', content: '' },
    handleFormSubmit
  )

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm: formReset
  } = formState

  return (
    <form onSubmit={handleSubmit} className="glass-panel p-10 space-y-8">
      <div className="mb-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">Write Your Story</h2>
        <p className="text-slate-600">Create an interactive adventure with branching choices.</p>
      </div>

      {/* API Error */}
      {apiError && (
        <ErrorMessage
          error={apiError}
          onDismiss={() => setApiError(null)}
        />
      )}

      {/* Success Message */}
      {successMessage && (
        <div className="p-4 bg-emerald-500/10 border-l-4 border-emerald-400 rounded">
          <p className="text-emerald-200 font-medium">✓ {successMessage}</p>
        </div>
      )}

      {/* Title Field */}
      <div>
        <label htmlFor="title" className="block text-sm font-semibold text-slate-900 mb-2">
          Story Title <span className="text-pink-400" aria-label="required">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="e.g., The Mysterious Island"
          required
          maxLength="100"
          className={`w-full px-4 py-3 border rounded-2xl bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition ${
            touched.title && errors.title ? 'border-red-500 bg-red-50/20' : 'border-slate-300'
          }`}
          aria-invalid={touched.title && errors.title ? 'true' : 'false'}
          aria-describedby={touched.title && errors.title ? 'title-error' : undefined}
        />
        {touched.title && errors.title && (
          <p id="title-error" className="mt-1 text-sm text-red-600">✕ {errors.title}</p>
        )}
      </div>

      {/* Author Field */}
      <div>
        <label htmlFor="author" className="block text-sm font-semibold text-slate-900 mb-2">
          Author Name <span className="text-pink-400" aria-label="required">*</span>
        </label>
        <input
          type="text"
          id="author"
          name="author"
          value={values.author}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Your name"
          required
          maxLength="50"
          className={`w-full px-4 py-3 border rounded-2xl bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition ${
            touched.author && errors.author ? 'border-red-500 bg-red-50/20' : 'border-slate-300'
          }`}
          aria-invalid={touched.author && errors.author ? 'true' : 'false'}
          aria-describedby={touched.author && errors.author ? 'author-error' : undefined}
        />
        {touched.author && errors.author && (
          <p id="author-error" className="mt-1 text-sm text-red-600">✕ {errors.author}</p>
        )}
      </div>

      {/* Content Field */}
      <div>
        <label htmlFor="content" className="block text-sm font-semibold text-slate-900 mb-2">
          Story Content <span className="text-pink-400" aria-label="required">*</span>
        </label>
        <textarea
          id="content"
          name="content"
          value={values.content}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Write your story here. Include choice prompts to create branching paths."
          required
          rows="12"
          maxLength="5000"
          className={`w-full px-4 py-3 border rounded-2xl bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition font-mono text-sm ${
            touched.content && errors.content ? 'border-red-500 bg-red-50/20' : 'border-slate-700'
          }`}
          aria-invalid={touched.content && errors.content ? 'true' : 'false'}
          aria-describedby={touched.content && errors.content ? 'content-error' : undefined}
        />
        <div className="mt-2 flex justify-between text-xs text-slate-500">
          <span>{values.content.length} / 5000 characters</span>
          {touched.content && errors.content && (
            <span id="content-error" className="text-red-600">✕ {errors.content}</span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row gap-3 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary flex-1 px-6 py-3 lg:px-8 lg:py-4 lg:text-lg xl:px-10 xl:py-5"
          aria-busy={isSubmitting}
        >
          {isSubmitting ? '✓ Creating Story...' : '✎ Create Story'}
        </button>
        <button
          type="button"
          onClick={() => {
            formReset()
            setApiError(null)
            setSuccessMessage(null)
          }}
          className="btn btn-outline px-6 py-3 lg:px-8 lg:py-4 lg:text-lg xl:px-10 xl:py-5"
          aria-label="Clear form"
        >
          Clear
        </button>
      </div>

      {/* Tips Section */}
      <div className="mt-8 p-4 rounded-3xl border border-slate-700 bg-slate-900/80" role="complementary">
        <h3 className="font-semibold text-white mb-3">💡 Writing Tips:</h3>
        <ul className="text-sm text-slate-300 space-y-2">
          <li className="flex items-start gap-2">
            <span className="flex-shrink-0">•</span>
            <span>Make your opening engaging to hook readers immediately</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="flex-shrink-0">•</span>
            <span>Clearly mark choice points where the story branches</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="flex-shrink-0">•</span>
            <span>Each choice should lead to meaningfully different outcomes</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="flex-shrink-0">•</span>
            <span>Mark terminal pages (story endings) clearly for readers</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="flex-shrink-0">•</span>
            <span>Test all paths to ensure they reach satisfying conclusions</span>
          </li>
        </ul>
      </div>
    </form>
  )
}