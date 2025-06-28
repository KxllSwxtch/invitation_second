import { useState, useEffect } from "react"
import { db } from "../firebase"
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"
import { motion, AnimatePresence } from "framer-motion"

const AdminPage = () => {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, "rsvp_responses"))
        setSubmissions(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        )
      } catch (error) {
        console.error("Ошибка загрузки данных:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "rsvp_responses", id))
      setSubmissions((prev) => prev.filter((item) => item.id !== id))
    } catch (error) {
      console.error("Ошибка удаления:", error)
      alert("Произошла ошибка при удалении")
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  }

  const attendingGuests = submissions.filter(
    (guest) => guest.attendance === "буду"
  )
  const notAttendingGuests = submissions.filter(
    (guest) => guest.attendance === "не смогу"
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div
            className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-gray-600 font-[Involve]">Загружаем данные...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-[PassionsConflict] text-gray-800 mb-4">
            Панель администратора
          </h1>
          <p className="text-gray-600 font-[Involve] text-lg">
            Управление ответами гостей
          </p>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20"
          >
            <h3 className="text-2xl font-bold text-green-600 mb-2">
              {attendingGuests.length}
            </h3>
            <p className="text-gray-600 font-[Involve]">Подтвердили участие</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20"
          >
            <h3 className="text-2xl font-bold text-red-500 mb-2">
              {notAttendingGuests.length}
            </h3>
            <p className="text-gray-600 font-[Involve]">
              Не смогут присутствовать
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20"
          >
            <h3 className="text-2xl font-bold text-blue-600 mb-2">
              {submissions.length}
            </h3>
            <p className="text-gray-600 font-[Involve]">Всего ответов</p>
          </motion.div>
        </motion.div>

        {/* Guests List */}
        {submissions.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-xl border border-white/20 text-center"
          >
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-[PassionsConflict] text-gray-600 mb-2">
              Пока нет ответов от гостей
            </h3>
            <p className="text-gray-500 font-[Involve]">
              Ответы будут появляться здесь по мере их поступления
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {submissions.map((entry) => (
                <motion.div
                  key={entry.id}
                  variants={cardVariants}
                  layout
                  exit="exit"
                  whileHover={{ y: -5 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-shadow"
                >
                  {/* Guest Name */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 font-[Involve]">
                      {entry.name}
                    </h3>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(entry.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      title="Удалить"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </motion.button>
                  </div>

                  {/* Attendance Status */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          entry.attendance === "буду"
                            ? "bg-green-400"
                            : "bg-red-400"
                        }`}
                      />
                      <span
                        className={`text-sm font-medium ${
                          entry.attendance === "буду"
                            ? "text-green-700"
                            : "text-red-700"
                        }`}
                      >
                        {entry.attendance === "буду"
                          ? "Будет присутствовать"
                          : "Не сможет присутствовать"}
                      </span>
                    </div>
                  </div>

                  {/* Drinks Preferences */}
                  {entry.drinks && entry.drinks.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-500 mb-2 font-[Involve]">
                        Предпочтения по напиткам:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {entry.drinks.map((drink, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
                          >
                            {drink}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default AdminPage
