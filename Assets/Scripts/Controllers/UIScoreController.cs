using System;
using System.Threading;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;
using TMPro;

public class UIScoreController : MonoBehaviour
{
    //Singleton
    public static UIScoreController uisc;

    public TextMeshProUGUI txtLevel;

    public RectTransform rctScore;

    private const float MAX_WIDTH_SCORE = 250.98f;

    public int score = 0;
    public int level = 1;

    //Quantidade de Score necessário para passar para o próximo nível
    private static int[] scoreNeedToNextLevel = new int[7] {
        15, //Level 1 --> 2
        15, //Level 2 --> 3
        15, //Level 3 --> 4
        15, //Level 4 --> 5
        15, //Level 5 --> 6
        15, //Level 6 --> 7
        15  //Level 7 --> 8
    };

    private void Awake()
    {
        if (uisc == null)
            uisc = this;
        else if (uisc != this)
            Destroy(gameObject);


        score = PlayerPrefs.GetInt("score", 0);
        level = PlayerPrefs.GetInt("level", 1);
    }

    public void addScore(int scr)
    {
        score += scr;

        if (score >= scoreNeedToNextLevel[level - 1])
        {
            level++;
            score = score - scoreNeedToNextLevel[level - 1];
        }

        updateLevelOnUI();
        updateScoreBar();
    }


    private void updateLevelOnUI()
    {

        uisc.txtLevel.text = "Nível " + level.ToString();
    }

    private void updateScoreBar()
    {
        float rightValue = getRightValue();

        rctScore.offsetMin = new Vector2(-535.6005f, 370.5798f);
        rctScore.offsetMax = new Vector2(-rightValue, 295.9988f);
    }

    private float getRightValue()
    {
        int neededScore = scoreNeedToNextLevel[level - 1];

        float rightValue = remap(score, 0, neededScore, 0, MAX_WIDTH_SCORE);

        rightValue = 635 - rightValue;

        return rightValue;
    }

    float remap(float x, float in_min, float in_max, float out_min, float out_max)
    {
        return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }

}
