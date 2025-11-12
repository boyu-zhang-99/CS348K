experiment="yining"
SEQUENCES=("yining")
for SEQUENCE in ${SEQUENCES[@]}; do
    dataset="custom/$SEQUENCE"
    bash scripts/custom/process-sequence.sh ./data/custom/$SEQUENCE neutral
    #python fit.py --config-name SNARF_NGP_fitting dataset=$dataset experiment=$experiment deformer=smpl train.max_epochs=100
    python train.py --config-name SNARF_NGP_fitting dataset=$dataset experiment=$experiment deformer=smpl train.max_epochs=100
    python novel_view.py --config-name SNARF_NGP_fitting dataset=$dataset experiment=$experiment deformer=smpl
    python animate.py --config-name SNARF_NGP_fitting dataset=$dataset experiment=$experiment deformer=smpl
done
