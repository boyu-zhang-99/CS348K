experiment="baseline"
SEQUENCES=("female-3-casual")
for SEQUENCE in ${SEQUENCES[@]}; do
    dataset="peoplesnapshot/$SEQUENCE"
    python train.py --config-name demo dataset=$dataset experiment=$experiment train.max_epochs=80
    # python eval.py --config-name SNARF_NGP_refine dataset=$dataset experiment=$experiment
done