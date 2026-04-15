import Header from '../components/Header'
import AuthorForm from '../components/AuthorForm'
import Breadcrumbs from '../components/Breadcrumbs'
import { ACCESSIBILITY } from '../constants'

export default function Author() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Header />

      {/* Main Content */}
      <main id={ACCESSIBILITY.MAIN_CONTENT_ID} className="flex-grow">
        <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Create Story' }
          ]} />

          <div className="mt-8">
            <AuthorForm />
          </div>
        </div>
      </main>
    </div>
  )
}
