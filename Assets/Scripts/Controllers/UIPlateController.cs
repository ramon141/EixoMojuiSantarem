using System;
using System.Threading;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;
using TMPro;

public class UIPlateController : MonoBehaviour
{
    //Singleton
    public static UIPlateController uipc;

    private float delay = 0.05f;
    private string fullText;
    private string currentText = "";


    public GameObject gbTextPlate;
    public GameObject gbBackground;

    private GameObject plate = null;

    private bool showPlateInfo = false;

    public void Awake()
    {
        if (uipc == null)
            uipc = this;
        else if (uipc != this)
            Destroy(gameObject);
    }

    public void Update()
    {
        float input = Input.GetAxisRaw("Submit");
        float cancel = Input.GetAxisRaw("Cancel");

        if (input > 0) showPlateInfo = true;

        if (showPlateInfo && plate != null && !gbTextPlate.activeSelf)
        {
            gbTextPlate.SetActive(true);

            //Ativa o fundo
            gbBackground.SetActive(true);

            //Ativa e altera o texto
            fullText = plate.GetComponent<Text>().text;
            currentText = "";
            StartCoroutine(ShowText());
        }

        if (cancel > 0)
        {
            currentText = "";
            //Ativa e altera o texto
            gbTextPlate.SetActive(false);

            //Ativa o fundo
            gbBackground.SetActive(false);

            showPlateInfo = false;
        }
    }


    private IEnumerator ShowText()
    {
        for (int i = 0; i < fullText.Length && gbTextPlate.activeSelf; i++)
        {
            currentText = fullText.Substring(0, i);
            gbTextPlate.GetComponent<TextMeshProUGUI>().text = currentText;
            yield return new WaitForSeconds(delay);
        }
    }



    public void onEnterInPlate(GameObject plateLocal)
    {
        plateLocal.transform.Find("Question").GetComponent<SpriteRenderer>().enabled = true;
        plate = plateLocal;
        currentText = "";
    }

    public void onExidInPlate(GameObject plateLocal)
    {
        if (plate != null)
        {
            currentText = "";
            plate.transform.Find("Question").GetComponent<SpriteRenderer>().enabled = false;

            gbTextPlate.SetActive(false);
            gbBackground.SetActive(false);

            showPlateInfo = false;

            plate = null;
        }
    }

}
