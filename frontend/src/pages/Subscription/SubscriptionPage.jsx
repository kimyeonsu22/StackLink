import { useState } from 'react';
import { FiZap } from 'react-icons/fi';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';

const SubscriptionPage = () => {
  // TODO: 백엔드 구독 여부 확인 API 연동 후 교체
  const [isSubscribed, setIsSubscribed] = useState(localStorage.getItem('isSubscribed') === 'true');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalType, setModalType] = useState(null); // 'subscribe' | 'cancel'

  // 구독 신청 API 요청
  const handleConfirm = () => {


    if (modalType === 'subscribe') {
      // 구독 신청
      fetch('/api/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({ subName: 'premium' })
      }).then(response => {
        if(response.ok) {
          localStorage.setItem('isSubscribed', true);
          setIsSubscribed(true);
        } else {
          response.json().then(data => {
            alert(data.message);
          })
        }
      }).catch(error => {
        console.error('Error:', error);
      })

    } else {
      // 구독 취소
      fetch('/api/subscriptions', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      }).then(response => {
        if(response.ok) {
          localStorage.setItem('isSubscribed', false);
          setIsSubscribed(false);
        }
      })
    }
    setShowConfirmModal(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto flex items-center justify-center p-8">

          <div className="bg-white border border-gray-200 rounded-2xl p-10 w-full max-w-md flex flex-col items-center gap-6 text-center shadow-sm">

            <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
              <FiZap className="text-purple-600 text-3xl" />
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="text-xl font-bold text-gray-900">AI 프로젝트 추천</h1>
              <p className="text-sm text-gray-500 leading-relaxed">
                구독하면 공고 리스트 오른쪽에<br />
                AI가 나에게 맞는 프로젝트를 자동으로 추천해드려요.
              </p>
            </div>

            <div className="w-full bg-gray-50 rounded-xl p-4 flex flex-col gap-1">
              <p className="text-2xl font-bold text-purple-600">₩9,900</p>
              <p className="text-xs text-gray-400">/ 월</p>
            </div>

            {isSubscribed == true ? (
              <div className="w-full flex flex-col gap-3">
                <span className="bg-purple-100 text-purple-600 text-sm font-semibold px-4 py-2 rounded-full">
                  현재 구독 중
                </span>
                <button
                  onClick={() => { setModalType('cancel'); setShowConfirmModal(true); }}
                  className="w-full py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-400 hover:bg-gray-50 transition"
                >
                  구독 취소
                </button>
              </div>
            ) : (
              <button
                onClick={() => { setModalType('subscribe'); setShowConfirmModal(true); }}
                className="w-full py-3 rounded-xl text-sm font-semibold bg-purple-600 text-white hover:bg-purple-700 transition"
              >
                구독하기
              </button>
            )}

          </div>

        </main>
      </div>

      {/* 확인 모달 */}
      {showConfirmModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowConfirmModal(false)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-sm p-6 flex flex-col gap-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-1">
              <h3 className="text-base font-bold text-gray-900">
                {modalType === 'subscribe' ? '프리미엄 구독' : '구독 취소'}
              </h3>
              <p className="text-sm text-gray-500">
                {modalType === 'subscribe'
                  ? '월 ₩9,900에 프리미엄 플랜을 구독하시겠습니까?'
                  : '구독을 취소하시겠습니까?'}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-500 hover:bg-gray-50 transition"
              >
                닫기
              </button>
              <button
                onClick={handleConfirm}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition ${
                  modalType === 'subscribe' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-red-500 hover:bg-red-600'
                }`}
              >
                {modalType === 'subscribe' ? '구독하기' : '취소하기'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SubscriptionPage;
