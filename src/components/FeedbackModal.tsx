// Brief feedback modal shown after a player resolves an incident
// Shows whether the fix was correct and what rewards were earned

interface FeedbackModalProps {
  correct: boolean;
  feedback: string;
  catnipReward: number;
  influenceReward: number;
  onClose: () => void;
}

export function FeedbackModal({
  correct,
  feedback,
  catnipReward,
  influenceReward,
  onClose,
}: FeedbackModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal feedback-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`feedback-result ${correct ? "correct" : "incorrect"}`}>
          {correct ? "CORRECT FIX" : "WRONG FIX"}
        </div>
        <p className="modal-description">{feedback}</p>
        {correct && (
          <div className="feedback-rewards">
            <span>+{catnipReward} Catnip</span>
            <span>+{influenceReward} Influence</span>
          </div>
        )}
        <button className="modal-close" onClick={onClose}>
          Continue
        </button>
      </div>
    </div>
  );
}
