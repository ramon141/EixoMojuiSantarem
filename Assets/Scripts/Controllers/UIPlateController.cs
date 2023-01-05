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

        if (showPlateInfo && plate != null)
        {
            //Ativa e altera o texto
            gbTextPlate.GetComponent<TextMeshProUGUI>().text = plate.GetComponent<Text>().text;
            gbTextPlate.SetActive(true);

            //Ativa o fundo
            gbBackground.SetActive(true);
        }

        if (cancel > 0)
        {
            //Ativa e altera o texto
            gbTextPlate.GetComponent<TextMeshProUGUI>().text = plate.GetComponent<Text>().text;
            gbTextPlate.SetActive(false);

            //Ativa o fundo
            gbBackground.SetActive(false);

            showPlateInfo = false;
        }
    }

    public void onEnterInPlate(GameObject plateLocal)
    {
        plateLocal.transform.Find("Question").GetComponent<SpriteRenderer>().enabled = true;
        plate = plateLocal;
    }

    public void onExidInPlate(GameObject plateLocal)
    {
        if (plate != null)
        {
            plate.transform.Find("Question").GetComponent<SpriteRenderer>().enabled = false;

            gbTextPlate.SetActive(false);
            gbBackground.SetActive(false);

            plate = null;
        }
    }

}
